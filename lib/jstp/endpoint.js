var exceptions = require("./exceptions");

/* 
 * JSTPEndpoint
 * ============
 * 
 * The object representation of the Endpoint Header, 
 * with the Method Pattern and Resource Patterns as
 * accessible properties.
 * 
 */
function JSTPEndpoint() {}

/* 
 * setMethodPattern( String methodPattern )
 * ----------------------------------------
 * 
 * Sets the string argument as the method pattern of the JSTPEndpoint.
 *
 * If the argument is null, empties the method pattern.
 * 
 * In loosely types languages, throws an exception if the argument is not 
 * a String.
 *
 * #### Arguments
 *
 * - String methodPattern
 *
 * #### Returns
 *
 * - Null
 *
 * #### Throws
 *
 * - JSTPInvalidMethodPatternType (in loosely types languages only)
 *
 */
JSTPEndpoint.prototype.setMethodPattern = function (methodPattern) {
  if ((typeof methodPattern == 'string' || methodPattern instanceof String) || methodPattern == null) 
    this.methodPattern = methodPattern;

  else
    throw new exceptions.JSTPInvalidMethodPatternType("Invalid Method Pattern type");
}

/*
 * getMethodPattern()
 * ------------------
 *
 * Returns the method pattern.
 *
 * #### Returns
 *
 * - String methodPattern
 *
 */
JSTPEndpoint.prototype.getMethodPattern = function () {
  return this.methodPattern;
}

/* 
 * setResourcePattern( String resourcePattern )
 * ----------------------------------------
 * 
 * Sets the array argument as the resource pattern of the JSTPEndpoint.
 *
 * If the argument is null, empties the resource pattern.
 * 
 * Throws an exception if the argument is an empty array.
 * 
 * In loosely types languages, throws an exception if the argument is not 
 * an array.
 *
 * #### Arguments
 *
 * - Array resourcePattern
 *
 * #### Returns
 *
 * - Null
 *
 * #### Throws
 *
 * - JSTPInvalidResourcePatternType
 *
 */
 JSTPEndpoint.prototype.setResourcePattern = function(resourcePattern) {
  if ((
        (typeof resourcePattern == "array" || resourcePattern instanceof Array) 
        && resourcePattern.length > 0
      ) || resourcePattern == null) 

    this.resourcePattern = resourcePattern;

  else 
    throw new exceptions.JSTPInvalidResourcePatternType("Invalid Resource Pattern type");
};

/*
 * getResourcePattern()
 * ------------------
 *
 * Returns the resource pattern.
 *
 * #### Returns
 *
 * - String resourcePattern
 *
 */
JSTPEndpoint.prototype.getResourcePattern = function () {
  return this.resourcePattern;
}

/*
 * validate()
 * 
 * Returns true if the JSTPEndpoint has both a method pattern
 * and a resource pattern. Throws relevant exceptions otherwise.
 *
 * #### Returns
 * - Boolean status
 * 
 * #### Throws
 * 
 * - JSTPMissingMethodPatternInEndpoint
 * - JSTPMissingResourcePatternInEndpoint
 *
 */
JSTPEndpoint.prototype.validate = function () {
  if (!this.methodPattern) 
    throw new exceptions
      .JSTPMissingMethodPatternInEndpoint("Missing Method Pattern in Endpoint");

  if (!this.resourcePattern)
    throw new exceptions
      .JSTPMissingResourcePatternInEndpoint("Missing Resource Pattern in Endpoint");
  return true;
}

module.exports = JSTPEndpoint;