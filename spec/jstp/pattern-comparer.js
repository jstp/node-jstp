var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPPatternComparer').addBatch({

  '.compare( pattern, value [, matches [, notUseNamedElementPattern ] ])': {

    'pattern: null | value: null | Error': function () {
      assert.throws( function () { jstp.JSTPPatternComparer.compare(null, null); } );
    },

    'pattern: null | value: [null] | Error': function () {
      assert.throws( function () { jstp.JSTPPatternComparer.compare(null, [null]); } );    
    },

    'pattern: [null] | value: null | Error': function () {
      assert.throws( function () { jstp.JSTPPatternComparer.compare([null], null); } );    
    },

    'pattern: [null] | value: [null] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare([null], [null]) );    
    },

    'pattern: ["null"] | value: [null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null"], [null]) );    
    },

    'pattern: ["null", "null"] | value: ["null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", "null"], ["null"]) );    
    },

    'pattern: ["null", "null"] | value: ["null", null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", "null"], ["null", null]) );    
    },

    'pattern: ["null", "null"] | value: ["null", "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["null", "null"], ["null", "null"]) );    
    },

    'pattern: ["null", "null", "null"] | value: ["null", "null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", "null", "null"], ["null", "null"]) );    
    },

    'pattern: ["..."] | value: [null] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], [null]) );
    },

    'pattern: ["...", "null"] | value: [null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "null"], [null]) );
    },

    'pattern: ["...", "null"] | value: [null, "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "null"], [null, "null"]) );
    },

    'pattern: ["...", "null"] | value: [null, "o"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "null"], [null, "o"]) );
    },

    'pattern: ["...", "null"] | value: [null, "null", "o"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "null"], [null, "null", "o"]) );
    },

    'pattern: ["null"] | value: ["null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["null"], ["null"]) );    
    },

    'pattern: ["null", null] | value: ["null", "null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", null], ["null", "null"]) );
    },

    'pattern: ["null", "null"] | value: ["null", "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["null", "null"], ["null", "null"]) );
    },

    'pattern: [null, "null"] | value: ["null", "null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare([null, "null"], ["null", "null"]) );
    },

    'pattern: ["null", "null", null] | value: ["null", "null", "null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", "null", null], ["null", "null", "null"]) );
    },

    'pattern: ["null", "null", "null"] | value: ["null", "null", "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["null", "null", "null"], ["null", "null", "null"]) );
    },

    'pattern: ["null", "null", "null", null] | value: ["null", "null", "null", "null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", "null", "null", null], ["null", "null", "null", "null"]) );
    },

    'pattern: [null, "null", "null", null] | value: ["null", "null", "null", null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare([null, "null", "null", null], ["null", "null", "null", null]) );
    },

    'pattern: ["*", "null", "null", null] | value: ["null", "null", "null", null] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["*", "null", "null", null], ["null", "null", "null", null]) );
    },

    'pattern: ["null", "*", "null", null] | value: ["null", "null", "null", null] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["null", "*", "null", null], ["null", "null", "null", null]) );
    },

    'pattern: ["null", "*", "null", null] | value: ["null", "null", "null", null] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["null", "*", "null", null], ["null", "null", "null", null]) );
    },

    'pattern: ["null", "*", null, null] | value: ["null", "null", "null", null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", "*", null, null], ["null", "null", "null", null]) );
    },

    'pattern: ["null", "*", "null", "null"] | value: ["null", "null", "null", null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["null", "*", "null", "null"], ["null", "null", "null", null]) );
    },

    'pattern: ["..."] | value: ["null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], ["null"]) );
    },

    'pattern: ["...", "null"] | value: ["null", null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "null"], ["null", null]) );
    },

    'pattern: ["...", "null"] | value: ["null", "null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "null"], ["null", "null"]) );
    },
  ////////
    'pattern: ["..."] | value: ["null", "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], ["null", "null"]) );
    },

    'pattern: ["..."] | value: ["null", "null", "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], ["null", "null", "null"]) );
    },

    'pattern: ["...", null] | value: ["null", "null", "null"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", null], ["null", "null", "null"]) );
    },

    'pattern: ["...", null, "..."] | value: ["null", null, "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", null, "..."], ["null", null, "null"]) );
    },

    'pattern: ["...", "*"] | value: ["null", null, "null"] | JSTPInvalidSyntaxForPattern': function () {
      assert.throws( function () { 
        jstp.JSTPPatternComparer.compare(["...", "*"], ["null", null, "null"]);  
      }, jstp.JSTPInvalidSyntaxForPattern);
    },

    'pattern: ["...", null, "*"] | value: ["null", null, "null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", null, "*"], ["null", null, "null"]) );
    },

    'pattern: ["*"] | value: ["null"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["*"], ["null"]) );    
    },

    'pattern: ["ship"] | value: ["ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["ship"], ["ship"]) );
    },
    
    'pattern: ["plane"] | value: ["ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["plane"], ["ship"]) );
    },

    'pattern: ["ship"] | value: ["car"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["ship"], ["car"]) );
    },

    'pattern: ["car"] | value: ["car"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["car"], ["car"]) );
    },

    'pattern: ["*"] | value: ["car"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["*"], ["car"]) );
    },

    'pattern: ["*"] | value: ["*"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["*"], ["*"]) );
    },    

    'pattern: ["..."] | value: ["*"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], ["*"]) );
    },

    'pattern: ["star"] | value: ["star", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star"], ["star", "ship"]) );
    },

    'pattern: ["star", "..."] | value: ["star", "ship", null] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "..."], ["star", "ship", null]) );
    },

    'pattern: ["stor", "..."] | value: ["star", "ship", null] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["stor", "..."], ["star", "ship", null]) );
    },

    'pattern: ["...", "Sparta"] | value: ["Athens", "Lesbos", "Sparta"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "Sparta"], ["Athens", "Lesbos", "Sparta"]) );
    },

    'pattern: ["*"] | value: ["star", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["*"], ["star", "ship"]) );
    },

    'pattern: ["*", "ship"] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["*", "ship"], ["star", "ship"]) );
    },

    'pattern: ["*", "shop"] | value: ["star", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["*", "shop"], ["star", "ship"]) );
    },

    'pattern: ["..."] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], ["star", "ship"]) );
    },

    'pattern: ["...", "ship"] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "ship"], ["star", "ship"]) );
    },

    'pattern: ["...", "shop"] | value: ["star", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "shop"], ["star", "ship"]) );
    },

    'pattern: ["star", "ship"] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "ship"], ["star", "ship"]) );
    },

    'pattern: ["star", "trek"] | value: ["star", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "trek"], ["star", "ship"]) );
    },

    'pattern: ["star", "trek"] | value: ["star", "wars"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "trek"], ["star", "wars"]) );
    },

    'pattern: ["star", "fire"] | value: ["star", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "fire"], ["star", "ship"]) );
    },

    'pattern: ["star", "ship"] | value: ["star"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "ship"], ["star"]) );
    },

    'pattern: ["star"] | value: ["star", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star"], ["star", "ship"]) );
    },

    'pattern: ["star", "o"] | value: ["star", "o", "ship"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "o"], ["star", "o", "ship"]) );
    },

    'pattern: ["..."] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], ["star", "ship"]) );
    },

    'pattern: ["star", "..."] | value: ["star", "fire"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "..."], ["star", "fire"]) );
    },

    'pattern: ["star", "..."] | value: ["star", "fire", "hole"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "..."], ["star", "fire", "hole"]) );
    },

    'pattern: ["star", "...", "holy"] | value: ["star", "fire", "hole"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "...", "holy"], ["star", "fire", "hole"]) );
    },

    'pattern: ["star", "fire", "holy"] | value: ["star", "fire", "hole"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "fire", "holy"], ["star", "fire", "hole"]) );
    },

    'pattern: ["star", "fyre", "hole"] | value: ["star", "fire", "hole"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "fyre", "hole"], ["star", "fire", "hole"]) );
    },

    'pattern: ["star", "..."] | value: ["star"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "..."], ["star"]) );
    },

    'pattern: ["star", "o", "..."] | value: ["star", "o"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "o", "..."], ["star", "o"]) );
    },

    'pattern: ["star", "e", "..."] | value: ["star", "o"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "e", "..."], ["star", "o"]) );
    },

    'pattern: ["star", "..."] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "..."], ["star", "ship"]) );
    },

    'pattern: ["star", "..."] | value: ["star", "ship", "x"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "..."], ["star", "ship", "x"]) );
    },

    'pattern: ["star", "*"] | value: ["star", "ship", "x"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["star", "*"], ["star", "ship", "x"]) );
    },

    'pattern: ["star", "*"] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["star", "*"], ["star", "ship"]) );
    },

    'pattern: ["*", "*"] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["*", "*"], ["star", "ship"]) );
    },

    'pattern: ["...", "*"] | value: ["star", "ship"] | JSTPInvalidSyntaxForPattern': function () {
      assert.throws( function () { 
        jstp.JSTPPatternComparer.compare(["...", "*"], ["star", "ship"]);
      }, jstp.JSTPInvalidSyntaxForPattern);
    },

    'pattern: ["..."] | value: ["star", "ship"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["..."], ["star", "ship"]) );
    },

    'pattern: ["...", "Sparta"] | value: ["Athens", "Sparta"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "Sparta"], ["Athens", "Sparta"]) );
    },

    'pattern: ["Lesbos", "Sparta"] | value: ["Athens", "Sparta"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["Lesbos", "Sparta"], ["Athens", "Sparta"]) );
    },

    'pattern: ["...", "Sparta"] | value: ["Athens", "Lesbos"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "Sparta"], ["Athens", "Lesbos"]) );
    },

    'pattern: ["...", "Sparta", "*"] | value: ["Athens", "Sparta", "Lesbos"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "Sparta", "*"], ["Athens", "Sparta", "Lesbos"]) );
    },

    'pattern: ["...", "Lesbos"] | value: ["Athens", "Sparta", "Lesbos"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "Lesbos"], ["Athens", "Sparta", "Lesbos"]) );
    },

    'pattern: ["...", "Sparta"] | value: ["Athens", "Sparta", "Lesbos"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "Sparta"], ["Athens", "Sparta", "Lesbos"]) );
    },

    'pattern: ["...", "Sparta"] | value: ["Athens", "Sparta", "Sparta"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "Sparta"], ["Athens", "Sparta", "Sparta"]) );
    },

    'pattern: ["...", "*"] | value: ["Sparta"] | JSTPInvalidSyntaxForPattern': function () {
      assert.throws( function () { 
        jstp.JSTPPatternComparer.compare(["...", "*"], ["Sparta"]); 
      }, jstp.JSTPInvalidSyntaxForPattern);
    },

    'pattern: ["...", "NotSparta"] | value: ["Sparta"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "NotSparta"], ["Sparta"]) );
    },

    'pattern: ["...", "NotSparta"] | value: ["NotSparta", "Sparta"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "NotSparta"], ["NotSparta", "Sparta"]) );
    },

    'pattern: ["...", "...", "NotSparta"] | value: ["NotSparta", "Sparta"] | JSTPInvalidSyntaxForPattern': function () {
      assert.throws( function () { 
        jstp.JSTPPatternComparer.compare(["...", "...", "NotSparta"], ["NotSparta", "Sparta"]); 
      }, jstp.JSTPInvalidSyntaxForPattern);
    },

    'pattern: ["...", "NotSparta", "*"] | value: ["NotSparta", "Sparta"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "NotSparta", "*"], ["NotSparta", "Sparta"]) );
    },

    'pattern: ["...", "Else", "*"] | value: ["NotSparta", "Sparta"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "Else", "*"], ["NotSparta", "Sparta"]) );
    },


    'pattern: ["...", "Lesbos", "*"] | value: ["Athens", "Sparta", "Lesbos"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "Lesbos", "*"], ["Athens", "Sparta", "Lesbos"]) );
    },

    'pattern: ["...", "Sparta", "*"] | value: ["Athens", "Sparta", "Lesbos"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "Sparta", "*"], ["Athens", "Sparta", "Lesbos"]) );
    },

    'pattern: ["...", "Hey", "Lesbos", "*"] | value: ["Athens", "Sparta", "Hey", "Lesbos"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "Hey", "Lesbos", "*"], ["Athens", "Sparta", "Hey", "Lesbos"]) );
    },

    'pattern: ["...", "Hey", "Lesbos", "..."] | value: ["Athens", "Sparta", "Hey", "Lesbos"] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "Hey", "Lesbos", "..."], ["Athens", "Sparta", "Hey", "Lesbos"]) );
    },

    'pattern: ["...", "NotLesbos", "..."] | value: ["Lesbos"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "NotLesbos", "..."], ["Lesbos"]) );
    },

    'pattern: ["...", "NotLesbos", "Hey", "..."] | value: ["Lesbos", "Hey"] | False': function () {
      assert.isFalse( jstp.JSTPPatternComparer.compare(["...", "NotLesbos", "..."], ["Lesbos", "Hey"]) );
    },

    'pattern: ["...", "Lesbos", "*"] | value: ["Athens", "Sparta", "Lesbos", null] | True': function () {
      assert.isTrue( jstp.JSTPPatternComparer.compare(["...", "Lesbos", "*"], ["Athens", "Sparta", "Lesbos", null]) );
    },

    'pattern: [":named"] | value: ["stuff"] | {named: "stuff"}': function () {
      var result = jstp.JSTPPatternComparer.compare([":named"], ["stuff"]);
      assert.equal(result.named, "stuff");
    },

    'pattern: [":named", null] | value: ["staff", null] | {named: "staff"}': function () {
      var result = jstp.JSTPPatternComparer.compare([":named", null], ["staff", null]);
      assert.equal(result.named, "staff");
    },

    'pattern: [":named"] | value: ["staff", null] | False': function () {
      assert.isFalse(jstp.JSTPPatternComparer.compare([":named"], ["staff", null]));
    },

    'pattern: [":special", "...", null, ":value"] | value: ["stuff", "moar", null, "key"] | {special: "stuff", value: "key"}': function () {
      var result = jstp.JSTPPatternComparer.compare(
        [":special", "...", null, ":value"],
        ["stuff", "moar", null, "key"]
      );
  
      assert.equal(result.special, "stuff");
      assert.equal(result.value, "key");
    },

    'pattern: ["...", ":named"] | value: ["stuff"] | JSTPInvalidSyntaxForPattern': function () {
      assert.throws(function () {
        jstp.JSTPPatternComparer.compare(["...", ":named"], ["stuff"]);
      }, jstp.JSTPInvalidSyntaxForPattern);
    },

    'not use named element wildcard': {    
      'pattern: [":named"] | value: ["stuff"] | False': function () {
        assert.isFalse(jstp.JSTPPatternComparer.compare([":named"], ["stuff"], null, true));
      },

      'pattern: [":named", null] | value: ["staff", null] | False': function () {
        assert.isFalse(jstp.JSTPPatternComparer.compare([":named", null], ["staff", null], null, true));
      },

      'pattern: [":named"] | value: ["staff", null] | False': function () {
        assert.isFalse(jstp.JSTPPatternComparer.compare([":named"], ["staff", null], null, true));
      },

      'pattern: [":special", "...", null, ":value"] | value: [":special", "moar", null, ":value"] | True': function () {
        var result = jstp.JSTPPatternComparer.compare(
          [":special", "...", null, ":value"],
          [":special", "moar", null, ":value"],
          null, true
        );
    
        assert.isTrue(result);
      },

      'pattern: ["...", ":named"] | value: ["stuff"] | False': function () {
        assert.isFalse(jstp.JSTPPatternComparer.compare(["...", ":named"], ["stuff"], null, true));
      }
    }

  }

}).export(module);