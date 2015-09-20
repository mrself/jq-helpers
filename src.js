(function ($) {
	$.fn.extend({
		tabIndex: function(val) {
			return this.each(function(index, el) {
				var $this = $(this);
				if (val === undefined) {
					return $this.attr('tabindex');
				} else {
					$this.attr('tabindex', val);
				}
			});
		},

		title: function(val) {
			return this.each(function(index, el) {
				var $this = $(this);
				if (val === undefined) {
					return $this.attr('title');
				} else {
					$this.attr('title', val);
				}
			});
		},

		inEventTarget: function(event) {
			return event.target == this[0] || this[0].contains(event.target);
		},

		hasId: function() {
			return !!this[0].id;
		},

		scrollTo: function(duration) {
			$('html, body').animate({
	            scrollTop: $(this).offset().top
	        }, duration);
		}
	});
	
	$.extend($.expr[':'], {
		data: function(elem, i, match) {
			return !!$.data(elem, match[3]);
		},

		focusable: function(element) {
			var nodeName = element.nodeName.toLowerCase(),
			tabIndex = $.attr(element, 'tabindex');
			return (/input|select|textarea|button|object/.test(nodeName)
					? !element.disabled : 'a' == nodeName || 'area' == nodeName
					? element.href || !isNaN(tabIndex)
					: !isNaN(tabIndex))
				// the element and all of its ancestors must be visible
				// the browser may report that the area is hidden
				&& !$(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
		},

		tabbable: function(element) {
			var tabIndex = $.attr(element, 'tabindex');
			return (isNaN(tabIndex) || tabIndex >= 0) && $(element).is(':focusable');
		}
	});
	$.extend({
		// deprecated. use parseQueryParams instead
		getQueryParameters : function(str) {
			return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
		},
		makePlugin: function(pluginName, Plugin) {
			$.fn[pluginName] = function (options) {
				return this.each(function(index, el) {
					if (!$.data(this, 'plugin_' + pluginName)) {
						$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
					}
				});
			};
		},
		idExists: function(idName) {
			return $('#' + idName).length;
		},

		parseQueryParams: function(query) {
			query = query || document.location.search;
			var re = /([^&=]+)=?([^&]*)/g;
			var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
			var decode = function (str) {return decodeURIComponent( str.replace(decodeRE, " ") );};

		    var params = {}, e;
		    while ( e = re.exec(query) ) {
		        var k = decode( e[1] ), v = decode( e[2] );
		        if (k.substring(k.length - 2) === '[]') {
		            k = k.substring(0, k.length - 2);
		            (params[k] || (params[k] = [])).push(v);
		        }
		        else params[k] = v;
		    }
		    return params;
		}

	});
})(jQuery);