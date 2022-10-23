<?php
$fallbackImageUrl = ($attributes['fallbackImageUrl']) ?? '';
$bgVideoUrl = ($attributes['bgVideoUrl']) ?? '';
?>
<section class="video-bg">
    <div class="container">
        <div class="row">
            <div class="col col-md-6">
                <?php echo $content; ?>
            </div>
        </div>
    </div>
    <video autoplay muted loop class="video" id="bgVideo" poster="<?php echo $fallbackImageUrl; ?>">
        <source src="<?php echo $bgVideoUrl; ?>" type="video/mp4">
    </video>
</section>