const ObjHelper = {
    /**
     * Compares two objects. Recursively checks property objects as well. 
     * 
     * @param {Object} a - The reference object.
     * @param {Object} b - The object to compare against the reference.
     * @param {boolean} [exactMatch=true] - true by default, only properties present in reference object 'a' are compared. If false, returns true if 'b' has more properties than 'a'.
     * @returns {boolean} - True if the comparison condition is met, otherwise false.
     */
    isEqualObjects: function (a, b, exactMatch = true) {
        let aLen = 0;
        for (const [key, val] of Object.entries(a)) {
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            if (typeof (val) === typeof (Object)) {
                // recusively check and compare object values
                if (!isEqualObjects(val, b[key])) {
                    return false;
                }
            }
            else {
                if (val !== b[key]) {
                    return false;
                }
            }
            aLen++;
        }
        // compare length of both objects to determine they are identical. 
        if (exactMatch) {
            let bLen = 0;
            for (const key of Object.keys(b)) {
                if (!a.hasOwnProperty(key)) {
                    return false;
                }
                bLen++;
            }
            if (aLen !== bLen) {
                return false;
            }
        }
        return true;
    }
}

export default ObjHelper;