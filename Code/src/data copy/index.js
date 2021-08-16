import * as vobEffects from './effects.json';
import * as vobNature from './nature.json';
import * as vobSounds from './sounds.json';
import * as vobStatic from './static.json';

const vobs = {
    effects: vobEffects.default,
    nature: vobNature.default,
    sounds: vobSounds.default,
    static: vobStatic.default,
    all: [...vobStatic.default, ...vobNature.default, ...vobEffects.default, ...vobSounds.default]
}

export default vobs;