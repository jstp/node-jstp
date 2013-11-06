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

  return this;
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
 * setResourcePattern( Array resourcePattern )
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

  return this;
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
 * setFromPattern( Array<String> fromPattern )
 * -------------------------------------------
 * 
 * Sets the array argument as the from pattern of the JSTPEndpoint.
 *
 * If the argument is null, empties the from pattern.
 * 
 * Throws an exception if the argument is an empty array.
 * 
 * In loosely types languages, throws an exception if the argument is not 
 * an array.
 *
 * Throws an exception if one of the elements is not a string.
 *
 * #### Arguments
 *
 * - Array fromPattern
 *
 * #### Throws
 *
 * - JSTPInvalidFromPatternType
 *
 */
 JSTPEndpoint.prototype.setFromPattern = function(fromPattern) {
  if (fromPattern && !(fromPattern instanceof Array))
    throw new exceptions
      .JSTPInvalidFromPatternType(
        "Invalid From Pattern type: must be an array");

  if (fromPattern) {
    var index = 0;
    while (index < fromPattern.length) {
      if (typeof fromPattern[index] != "string")
        throw new exceptions.
          JSTPInvalidFromPatternType(
            "All elements must be strings");
      index ++;
    }
  }

  this.fromPattern = fromPattern;

  return this;
};

/*
 * getFromPattern()
 * ------------------
 *
 * Returns the from pattern.
 *
 * #### Returns
 *
 * - String fromPattern
 *
 */
JSTPEndpoint.prototype.getFromPattern = function () {
  if (this.fromPattern == undefined)
    this.fromPattern = null;

  return this.fromPattern;
}

/* 
 * setToPattern( Array<String> toPattern )
 * -------------------------------------------
 * 
 * Sets the array argument as the to pattern of the JSTPEndpoint.
 *
 * If the argument is null, empties the to pattern.
 * 
 * Throws an exception if the argument is an empty array.
 * 
 * In loosely types languages, throws an exception if the argument is not 
 * an array.
 *
 * Throws an exception if one of the elements is not a string.
 *
 * #### Arguments
 *
 * - Array toPattern
 *
 * #### Throws
 *
 * - JSTPInvalidToPatternType
 *
 */
 JSTPEndpoint.prototype.setToPattern = function(toPattern) {
  if (toPattern && !(toPattern instanceof Array))
    throw new exceptions
      .JSTPInvalidToPatternType(
        "Invalid To Pattern type: must be an array");

  if (toPattern) {
    var index = 0;
    while (index < toPattern.length) {
      if (typeof toPattern[index] != "string")
        throw new exceptions.
          JSTPInvalidToPatternType(
            "All elements must be strings");
      index ++;
    }
  }

  this.toPattern = toPattern;

  return this;
};

/*
 * getToPattern()
 * ------------------
 *
 * Returns the to pattern.
 *
 * #### Returns
 *
 * - String toPattern
 *
 */
JSTPEndpoint.prototype.getToPattern = function () {
  if (this.toPattern == undefined)
    this.toPattern = null;

  return this.toPattern;
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