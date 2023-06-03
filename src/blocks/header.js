import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { THEME_PATH } from '../../inc/theme';

registerBlockType('stepr/header', {
    title: 'Header',
    category: 'custom-blocks',
    supports: {
        align: true
    },
    attributes: {
        align: { type: 'string', default: 'full' }
    },
    edit: Edit,
    save: () => <InnerBlocks.Content />
});

function Edit() {
    return (
        <>
            <header className='site-header'>
                <div className='container'>
                    <img src={`${THEME_PATH}/stepr-logo-color-v3.svg`} className='logo'></img>
                    <div className='btn btn-primary'>Get started</div>
                </div>
            </header>
        </>
    );
}
