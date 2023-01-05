/*
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';*/


import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-clipboard/clipboard.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-code-block/codeblock.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-editor-classic/classiceditor.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-engine/placeholder.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-find-and-replace/findandreplaceform.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-font/fontcolor.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-heading/heading.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-horizontal-line/horizontalline.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-html-embed/htmlembed.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-image/imageupload.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-image/imageuploadicon.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-image/imageupoadloader.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-image/imageuploadprogress.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-link/link.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-link/linkactions.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-link/linkform.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-link/linkimage.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-link/collapsible.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-link/listproperties.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-link/liststyles.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-media-embed/mediaembedediting.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-mention/mention.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-restricted-editing/restrictedediting.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-special-characters/charactergrid.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-special-characters/characterinfo.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-special-characters/specialcharacters.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-style/style.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-style/stylegrid.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-style/stylegroup.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-style/stylepanel.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/colorinput.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/form.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/formrow.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/inserttable.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/tablecellproperties.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/tableediting.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/tableform.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/tableproperties.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-table/tableselection.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/button/button.css.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/button/switchbuton.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/colorgrid/colorgrid.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/dropdown/dropdown.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/dropdown/listdropdown.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/dropdown/splitbutton.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/dropdown/toolbardropdown.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/editorui/editorui.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/formheader/formheader.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/icon/icon.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/input/input.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/label/label.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/labeledfield/labeledfieldview.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/labeledinput/labeledinput.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/list/list.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/panel/balloonpanel.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/panel/palloonrotator.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/panel/fakepanel.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/panel/stickypanel.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/responsive-form/responsiveform.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/toolbar/blocktoolbar.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/toolbar/toolbar.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-ui/ui/tooltip/tooltip.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-widget/widget.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-widget/widgetresize.css';
import '@ckeditor/ckeditor-theme-lark/theme/ckeditor5-widget/widgettypearound.css';
/*
export default class InlineEditor extends InlineEditorBase {
    // Plugins to include in the build.
    static builtinPlugins = [
        Essentials,
        UploadAdapter,
        Autoformat,
        Bold,
        Italic,
        BlockQuote,
        CKBox,
        CKFinder,
        CloudServices,
        EasyImage,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        Link,
        List,
        MediaEmbed,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        Table,
        TableToolbar,
        TextTransformation
    ];
    
    // Editor configuration.
    static defaultConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'uploadImage',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo'
            ]
        },
        image: {
            toolbar: [
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'toggleImageCaption',
                'imageTextAlternative'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
        // This value must be kept in sync with the language defined in webpack.config.js.
        language: 'en'
    };
}
*/