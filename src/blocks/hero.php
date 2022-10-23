<?php
$bgImageUrl = ($attributes['bgImageUrl']) ?? '';
$bgVideoUrl = ($attributes['bgVideoUrl']) ?? '';
$anchor = ($attributes['anchor']) ?? '';

$classes = array('hero');

$wrapper_attributes = get_block_wrapper_attributes(
    [
        'class' => esc_attr(implode(' ', $classes)),
        'id' => $anchor
    ]
);
?>
<section <?php echo $wrapper_attributes; ?> style="background-image:url(<?php echo esc_url($bgImageUrl); ?>)">
    <?php if (function_exists('rank_math_the_breadcrumbs') && !is_front_page() && !is_404()) { ?>
        <div class="breadcrumbs-wrapper">
            <div class="container">
                <?php rank_math_the_breadcrumbs(); ?>
            </div>
        </div>
    <?php } ?>
    <div class="container">
        <?php echo $content; ?>
    </div>
    <?php if (is_front_page() && $bgVideoUrl) : ?>
        <video autoplay muted loop class="video-bg" id="heroBgVideo" poster="<?php echo esc_url($bgImageUrl); ?>">
            <source src="<?php echo esc_url($bgVideoUrl); ?>" type="video/mp4">
        </video>
    <?php endif; ?>
</section>