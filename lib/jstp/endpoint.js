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
function JSTPEndpoint() {
  this.toPattern = [];
  this.fromPattern = [];
}

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
  if (resourcePattern instanceof Array || resourcePattern == null)
    this.resourcePattern = resourcePattern || [];

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

  this.fromPattern = fromPattern || [];

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

  this.toPattern = toPattern || [];

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
 * ----------
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

  if (!this.resourcePattern || this.resourcePattern.length == 0)
    throw new exceptions
      .JSTPMissingResourcePatternInEndpoint("Missing Resource Pattern in Endpoint");
  return true;
}

/*
 * equivalent( JSTPEndpoint endpointToCompare )
 * --------------------------------------------
 *
 * Returns true if all header contents of this endpoint and the argument are equivalent, false otherwise.
 *
 * #### Arguments
 *
 * - JSTPEndpoint endpointToCompare
 *
 * #### Returns
 *
 * - Boolean areEquivalent
 *
 */
JSTPEndpoint.prototype.equivalent = function (endpoint) {
  var equivalencies = {
    methodPattern: true,
    resourcePattern: true,
    toPattern: true,
    fromPattern: true
  }

  if (endpoint.getMethodPattern() != this.getMethodPattern())
    equivalencies.methodPattern = false;

  if (this.getResourcePattern() && endpoint.getResourcePattern()) {
    var resourceIndex = 0;
    while (equivalencies.resourcePattern && resourceIndex < endpoint.getResourcePattern().length) {
      if (endpoint.getResourcePattern()[resourceIndex] != this.getResourcePattern()[resourceIndex])
        equivalencies.resourcePattern = false;
      resourceIndex ++;
    }    
  }

  if (this.getToPattern() && endpoint.getToPattern()) {
    var toIndex = 0;
    while (equivalencies.toPattern && toIndex < endpoint.getToPattern().length) {
      if (endpoint.getToPattern()[toIndex] != this.getToPattern()[toIndex])
        equivalencies.toPattern = false;
      toIndex ++;
    }    
  }

  if (this.getFromPattern() && endpoint.getFromPattern()) {
    var fromIndex = 0;
    while (equivalencies.fromPattern && fromIndex < endpoint.getFromPattern().length) {
      if (endpoint.getFromPattern()[fromIndex] != this.getFromPattern()[fromIndex])
        equivalencies.fromPattern = false;
      fromIndex ++;
    }    
  }

  return equivalencies.methodPattern && equivalencies.resourcePattern && equivalencies.toPattern && equivalencies.fromPattern;
}

/*
 * matchResourcePattern( JSTPDispatch dispatch )
 * ---------------------------------------------
 *
 * Returns true if the Resource Pattern matches the Matchable Endpoint Resource. 
 *
 * Returns the `matches` Object dictionary if there were Named Element Wildcards 
 * in the endpoints Resource Pattern.
 *
 * False otherwise.
 *
 * #### Arguments
 *
 * - JSTPDispatch dispatch
 *
 * #### Returns
 *
 * - Boolean | Object matches
 *
 * #### Throws
 *
 * - JSTPInvalidSyntaxForPattern
 * - Error
 *
 */
JSTPEndpoint.prototype.matchResourcePattern = function (dispatch) {
  return JSTPPatternComparer.compare(
    this.getResourcePattern(), 
    dispatch.getAsEndpoint().getResourcePattern());  
}

/*
 * matchFromPattern( JSTPDispatch dispatch )
 * ---------------------------------------------
 *
 * Returns true if the From Pattern matches the Matchable Endpoint From. 
 *
 * False otherwise.
 *
 * #### Arguments
 *
 * - JSTPDispatch dispatch
 *
 * #### Returns
 *
 * - Boolean matches
 *
 * #### Throws
 *
 * - JSTPInvalidSyntaxForPattern
 * - Error
 *
 */
JSTPEndpoint.prototype.matchFromPattern = function (dispatch) {
  return JSTPPatternComparer.compare(
    this.getFromPattern(), 
    dispatch.getAsEndpoint().getFromPattern(),
    null, true);  
}

/*
 * matchToPattern( JSTPDispatch dispatch )
 * ---------------------------------------------
 *
 * Returns true if the To Pattern matches the Matchable Endpoint To. 
 *
 * False otherwise.
 *
 * #### Arguments
 *
 * - JSTPDispatch dispatch
 *
 * #### Returns
 *
 * - Boolean matches
 *
 * #### Throws
 *
 * - JSTPInvalidSyntaxForPattern
 * - Error
 *
 */
JSTPEndpoint.prototype.matchToPattern = function (dispatch) {
  return JSTPPatternComparer.compare(
    this.getToPattern(), 
    dispatch.getAsEndpoint().getToPattern(),
    null, true);  
}

/*
 * matchMethodPattern( JSTPDispatch dispatch )
 * -------------------------------------------
 *
 * Returns true if the endpoints Method Pattern is a `*` Wildcard
 * or if both the endpoints Method Pattern and the Method Header
 * of the Dispatch are equal.
 *
 * #### Arguments
 *
 * - JSTPDispatch dispatch
 *
 * #### Returns
 *
 * - Boolean matches
 *
 */
JSTPEndpoint.prototype.matchMethodPattern = function (dispatch) {
  return this.getMethodPattern() == "*" || dispatch.getMethod() == this.getMethodPattern();
}

/* 
 * match( JSTPDispatch dispatch )
 * ------------------------------
 *
 * Returns true if all matchers for resource pattern, method pattern,
 * to pattern and from pattern return true.
 * 
 * False otherwise.
 * 
 * All error thrown by the matchers are propagated.
 *
 * #### Arguments
 * 
 * - JSTPDispatch dispatch
 *
 * #### Returns
 *
 * - Boolean matches
 *
 */
JSTPEndpoint.prototype.match = function(dispatch) {
  return  this.matchMethodPattern(dispatch) &&
          this.matchToPattern(dispatch) &&
          this.matchResourcePattern(dispatch) &&
          this.matchFromPattern(dispatch);
}

module.exports = JSTPEndpoint;