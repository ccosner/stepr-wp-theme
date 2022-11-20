<?php
$text = ($attributes['text']) ?? '';
$url = ($attributes['linkObject']['url']) ?? '';
$buttonStyle = ($attributes['buttonStyle']) ?? "btn-primary";
$anchor = ($attributes['anchor']) ?? '';

$classes = array('btn', 'btn-lg');
if ($buttonStyle) {
    array_push($classes, ($buttonStyle));
};

$wrapper_attributes = get_block_wrapper_attributes(
    [
        'class' => esc_attr(implode(' ', $classes)),
        'href' => esc_attr($url),
        'id' => $anchor
    ]
);
?>
<a <?php echo $wrapper_attributes ?>><?php echo esc_html(_e($text)); ?></a>