Ext.define('Ext.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',
    
    alias: 'widget.searchfield',
    
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    
    hasSearch : false,
    paramName : 'query',
    
    initComponent: function(){
        this.callParent(arguments);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.startSearch();
            }
        }, this);
    },
    setValue: function (value) {
		this.callParent(arguments);
		
		/*if (value.length < 1) {
			this.resetSearch();
		} else {
			this.startSearch();
		}*/
	},
    afterRender: function(){
        this.callParent();
        this.triggerEl.item(0).setDisplayed('none');
        this.doComponentLayout();
    },
    
    onTrigger1Click : function(){
        this.resetSearch();
    },

    onTrigger2Click : function(){
       this.startSearch();
    },
	
	resetSearch: function () {
		var me = this,
            store = me.store,
            proxy = store.getProxy(),
            val;
            
        if (me.hasSearch) {
            me.setValue('');
            proxy.extraParams[me.paramName] = '';
            store.currentPage = 1;
            store.load({ start: 0 });
            me.hasSearch = false;
            
            me.triggerEl.item(0).setDisplayed('none');
            me.doComponentLayout();
        }
	},
	startSearch: function () {
		 var me = this,
            store = me.store,
            proxy = store.getProxy(),
            value = me.getValue();
            
        if (value.length < 1) {
            me.resetSearch();
            return;
        }
        proxy.extraParams[me.paramName] = value;
        store.currentPage = 1;
        store.load({ start: 0 });
        
        me.hasSearch = true;
        me.triggerEl.item(0).setDisplayed('block');
        me.doComponentLayout();
	}
});