<?php

// Enqueue Styles and Scripts
function stepr_styles_and_scripts() {
    wp_enqueue_style('style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Inter:wght@100;300;400;700&display=swap', false);
    wp_enqueue_script('scripts', get_theme_file_uri('build/scripts.js'), array(), '1.0', true);
    wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/c42e2e5d2a.js', array(), null, false);
}
add_action('wp_enqueue_scripts', 'stepr_styles_and_scripts');

// Site feautres
function stepr_features() {
    add_image_size('hero', 2560, 1280);
    add_image_size('spotlight', 2560, 1080);
    add_theme_support('title-tag');
    add_theme_support('editor-styles');
    add_editor_style(array('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Inter:wght@100;300;400;700&display=swap', 'style.css'));
    register_nav_menus(array(
        'main-menu' => __('Main Menu')
    ));
    require_once get_template_directory() . '/class-wp-bootstrap-navwalker.php';
}
add_action('after_setup_theme', 'stepr_features');

// Blocks
class JSXBlock {
    function __construct($name, $renderCallback = null) {
        $this->name = $name;
        $this->renderCallback = $renderCallback;
        add_action('init', [$this, 'onInit']);
    }

    function renderCallbackFn($attributes, $content) {
        ob_start();
        require get_theme_file_path("src/blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        $args = array(
            'editor_script' => $this->name
        );

        if ($this->renderCallback) {
            $args['render_callback'] = [$this, 'renderCallbackFn'];
        }

        register_block_type("stepr/{$this->name}", $args);
    }
}

new JSXBlock('hero', true);
new JSXBlock('video-section', true);
new JSXBlock('button-group', true);
new JSXBlock('button', true);
new JSXBlock('header', true);
new JSXBlock('footer', true);

// Block category
function custom_block_categories($block_categories, $editor_context) {
    array_unshift(
        $block_categories,
        array(
            'slug'  => 'custom-blocks',
            'title' => "Custom Blocks",
            'icon'  => null,
        )
    );
    return $block_categories;
}
add_filter('block_categories_all', 'custom_block_categories', 10, 2);

// Allow SVG
function stepr_allow_svg($data, $file, $filename, $mimes) {
    global $wp_version;
    if ($wp_version !== '4.7.1') {
        return $data;
    }
    $filetype = wp_check_filetype($filename, $mimes);
    return [
        'ext'             => $filetype['ext'],
        'type'            => $filetype['type'],
        'proper_filename' => $data['proper_filename']
    ];
}
add_filter('wp_check_filetype_and_ext', 'stepr_allow_svg', 10, 4);

function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

// function fix_svg() {
//     echo '<style type="text/css">
//           .attachment-266x266, .thumbnail img {
//                width: 100% !important;
//                height: auto !important;
//           }
//           </style>';
// }
// add_action('admin_head', 'fix_svg');

// Remove <p> and <br/> from Contact Form 7
add_filter('wpcf7_autop_or_not', '__return_false');

// Enable Customizer
add_action('customize_register', '__return_true');
