import apiFetch from "@wordpress/api-fetch";
import { Button, PanelBody, PanelRow } from "@wordpress/components";
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useEffect } from "@wordpress/element";

registerBlockType("stepr/header", {
    title: "Header",
    attributes: {
        imageId: { type: "number" },
        imageUrl: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent(props) {
    const {
        attributes: { imageId, imageUrl },
        setAttributes,
        className,
    } = props;

    useEffect(
        function () {
            if (imageId) {
                async function go() {
                    const response = await apiFetch({
                        path: `/wp/v2/media/${imageId}`,
                        method: "GET"
                    });
                    setAttributes({ imageUrl: response.media_details.sizes.full.source_url });
                }
                go();
            }
        },
        [imageId]
    );

    function onFileSelect(file) {
        setAttributes({ imageId: file.id });
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title="Background" initialOpen={ true }>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ onFileSelect }
                                value={ imageId }
                                render={ ({ open }) => {
                                    return <Button onClick={ open } variant="secondary">Choose Image</Button>;
                                } }
                            />
                        </MediaUploadCheck>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <section className="header editor" style={ { backgroundImage: `url('${imageUrl}')` } }>
                <div className="container" >
                    <InnerBlocks />
                </div>
            </section>
        </>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}