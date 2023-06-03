import { registerBlockType } from '@wordpress/blocks';
import { THEME_PATH } from '../../inc/theme';

registerBlockType('stepr/footer', {
    title: 'Footer',
    category: 'custom-blocks',
    supports: {
        align: true
    },
    attributes: {
        align: { type: 'string', default: 'full' }
    },
    edit: Edit,
    save: () => null
});

function Edit() {
    return (
        <>
            <footer className='site-footer'>
                <div className='container'>
                    <img src={`${THEME_PATH}/stepr-logo-white-v3.svg`} className='logo'></img>
                </div>
            </footer>
        </>
    );
}
