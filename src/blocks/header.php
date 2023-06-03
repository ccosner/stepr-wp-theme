<header class="site-header">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <a href="<?php echo esc_url(get_home_url('/')); ?>"><img src="<?php echo esc_url(get_stylesheet_directory_uri() . '/images/stepr-logo-color-v3.svg'); ?>" class="logo" /></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars">Menu</i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'main-menu',
                    'container' => false,
                    'depth' => 1,
                    'menu_class' => 'nav navbar-nav',
                    'fallback_cb' => 'WP_Bootstrap_Navwalker::fallback',
                    'walker' => new WP_Bootstrap_Navwalker(),
                ));
                ?>
                <a href="/signup" class="btn btn-primary">Get started</a>
            </div>
        </div>
    </nav>
</header>