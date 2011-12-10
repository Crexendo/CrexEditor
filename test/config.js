CKEDITOR.editorConfig = function( config )
{
	config.width = '100%';
	config.resize_minWidth = '100%';
	config.resize_dir = 'vertical';
	config.skin = 'so';
	config.skinPath = '../';
	
	config.toolbarCanCollapse = false;
	
	config.toolbar = 'SOToolbar';
	 
	config.toolbar_SOToolbar =
	[
		{ name: 'document', items : [ 'Source' ] },
		{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
		{ name: 'editing', items : [ 'Find','Replace','-','SelectAll' ] },
		//'/',
		{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
		{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] },
        { name: 'links', items : [ 'Link','Unlink' ] },
        { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','SpecialChar' ] },
        //'/',
        { name: 'styles', items : [ 'Format','Font','FontSize' ] },
        { name: 'colors', items : [ 'TextColor','BGColor' ] },
        { name: 'tools', items : [ 'Maximize', 'ShowBlocks' ] }
	];
	
	config.docType = '<!DOCTYPE HTML>';
	
	config.filebrowserBrowseUrl =  '/browser/browse.php?type=Images';
	
	config.image_previewText = "";
	
	config.autoUpdateElement = true;
};

CKEDITOR.on( 'instanceReady', function( ev )
{
	//DISABLE xhtml output
	ev.editor.dataProcessor.writer.selfClosingEnd = '>';

	//autoupdate?
	ev.editor.document.on("keyup", function() {
		ev.editor.updateElement();
	});

	ev.editor.on ('afterCommandExec', function(){
		ev.editor.updateElement();
	});

	ev.editor.on ('afterUndoImage', function(){
		ev.editor.updateElement();
	});
	
	ev.editor.on ('blur', function(){
		ev.editor.updateElement();
	});
	
	//cleaning up leading whitespace
	var blockTags = ['div','h1','h2','h3','h4','h5','h6','p','pre','li','blockquote','ul','ol','table','thead','tbody','tfoot','td','th']; 

	for (var i = 0; i < blockTags.length; i++)
	{ 
		ev.editor.dataProcessor.writer.setRules( blockTags[i],
		{ 
			indent : false, 
			breakBeforeOpen : true, 
			breakAfterOpen : false, 
			breakBeforeClose : false, 
			breakAfterClose : true 
		}); 
	} 
});

