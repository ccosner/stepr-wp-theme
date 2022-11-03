<?php
$bgImageUrl = ($attributes['bgImageUrl']) ?? '';
$bgVideoUrl = ($attributes['bgVideoUrl']) ?? '';
$anchor = ($attributes['anchor']) ?? '';

$classes = array('video-section', 'text-bg-dark');

$wrapper_attributes = get_block_wrapper_attributes(
    [
        'class' => esc_attr(implode(' ', $classes)),
        'id' => $anchor
    ]
);
?>
<section <?php echo $wrapper_attributes; ?> style="background-image:url(<?php echo esc_url($bgImageUrl); ?>)">
    <div class="container">
        <?php echo $content; ?>
    </div>
    <?php if ($bgVideoUrl) : ?>
        <video autoplay muted loop class="bg-video" id="bgVideo" poster="<?php echo esc_url($bgImageUrl); ?>">
            <source src="<?php echo esc_url($bgVideoUrl); ?>" type="video/mp4">
        </video>
    <?php endif; ?>
</section>