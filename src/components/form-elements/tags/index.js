import Chips from './chips';
import Picker from './picker';
import Suggestions from './suggestions';

/**
 * "Chips" can be used indepdently from the Picker to just display chipped information, just do not pass down a "removeTag" prop to it
 * "Picker" depends on both Chips and Suggestions
 */

export {
    Chips,
    Picker,
    Suggestions
};