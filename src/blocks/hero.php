<section class="hero" <?php echo ($attributes['imageUrl']) ? 'style="background-image:url(\'' . $attributes['imageUrl'] . '\')"' : null; ?>>
    <div class="container">
        <?php echo $content; ?>
    </div>
</section>