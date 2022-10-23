import apiFetch from "@wordpress/api-fetch";
import { Button, PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useEffect } from "@wordpress/element";

registerBlockType("stepr/video-bg", {
    title: "Video Background",
    attributes: {
        fallbackImageId: { type: "number" },
        fallbackImageUrl: { type: "string" },
        bgVideoId: { type: "number" },
        bgVideoUrl: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent(props) {
    const {
        attributes: { fallbackImageId, fallbackImageUrl, bgVideoId, bgVideoUrl },
        setAttributes,
        className,
    } = props;

    useEffect(() => {
        console.log('effect');
        async function go() {
            const response = await apiFetch({
                path: `/wp/v2/media/${fallbackImageId}`,
                method: "GET"
            });
            setAttributes({ fallbackImageUrl: response.media_details.sizes.full.source_url });
        }
        go();
    }, [fallbackImageId]);

    const onFallbackImageSelect = (media) => setAttributes({ fallbackImageId: media.id });

    const onBgVideoSelect = (media) => setAttributes({ bgVideoId: media.id, bgVideoUrl: media.url });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Background" initialOpen={ true }>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload onSelect={ onFallbackImageSelect } value={ fallbackImageId } render={ ({ open }) => {
                                return <Button onClick={ open } variant="secondary">Choose fallback image</Button>;
                            } } />
                        </MediaUploadCheck>
                    </PanelRow>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload onSelect={ onBgVideoSelect } value={ bgVideoId } allowedTypes={ ['video/mp4'] } render={ ({ open }) => {
                                return <Button onClick={ open } variant="secondary">Choose video</Button>;
                            } } />
                        </MediaUploadCheck>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <section className="video-bg editor" style={ { backgroundImage: `url('${fallbackImageUrl}')` } }>
                <div class="container">
                    <div class="row">
                        <div class="col col-md-6">
                            <InnerBlocks />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

function SaveComponent() {
    return <InnerBlocks.Content />;
};