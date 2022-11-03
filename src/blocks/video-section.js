import apiFetch from "@wordpress/api-fetch";
import { Button, PanelBody, PanelRow } from "@wordpress/components";
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useEffect } from "@wordpress/element";
import { THEME_PATH } from "../../inc/theme";

registerBlockType("stepr/video-section", {
    title: "Video Section",
    category: "custom-blocks",
    supports: {
        anchor: true,
        align: true
    },
    attributes: {
        bgImageId: { type: "number" },
        bgImageUrl: { type: "string" },
        bgVideoId: { type: "number" },
        bgVideoUrl: { type: "string" },
        anchor: { type: "string" },
        align: { type: 'string', default: 'full' }
    },
    edit: Edit,
    save: () => <InnerBlocks.Content />
});

function Edit(props) {
    const {
        attributes: { bgImageId, bgImageUrl, bgVideoId, anchor },
        setAttributes,
        className
    } = props;

    useEffect(() => {
        if (!bgImageId) {
            return;
        } else {
            const fetchData = async () => {
                const response = await apiFetch({
                    path: `/wp/v2/media/${bgImageId}`,
                    method: "GET"
                });
                setAttributes({ bgImageUrl: response.media_details.sizes.hero.source_url });
            };
            fetchData().catch(console.error);
        };
    }, [bgImageId]);

    return (
        <>
            <InspectorControls>
                <PanelBody title="Background" initialOpen={ true }>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload onSelect={ (image) => setAttributes({ bgImageId: image.id }) } value={ bgImageId } render={ ({ open }) => {
                                return <Button onClick={ open } variant="primary">Choose background image</Button>;
                            } } />
                        </MediaUploadCheck>
                    </PanelRow>
                    <PanelRow>
                        <Button onClick={ () => setAttributes({ bgImageId: null, bgImageUrl: null }) } variant="secondary">Remove Image</Button>
                    </PanelRow>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload onSelect={ (video) => setAttributes({ bgVideoId: video.id, bgVideoUrl: video.url }) } value={ bgVideoId } allowedTypes={ ['video/mp4'] } render={ ({ open }) => {
                                return <Button onClick={ open } variant="primary">Choose video</Button>;
                            } } />
                        </MediaUploadCheck>
                    </PanelRow>
                    <PanelRow>
                        <Button onClick={ () => setAttributes({ bgVideoId: null, bgVideoUrl: null }) } variant="secondary">Remove video</Button>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <section className={ `video-section text-bg-dark ${className}` } style={ { backgroundImage: `url('${bgImageUrl}')` } } id={ anchor }>
                <div className="container">
                    <InnerBlocks />
                </div>
            </section>
        </>
    );
};