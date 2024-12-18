import Cookies from 'js-cookie';

export const saveRecentSpec = (spec, url) => {
    var recentSpecs = Cookies.get('recentSpecs');

    if ( !recentSpecs ) {
        recentSpecs = []
    } else {
        recentSpecs = JSON.parse(recentSpecs);
    }

    // create new
    const newSpec = {
        name: spec.name,
        id: spec.id,
        url: url,
        date: Date.now()
    }

    // check if already exists
    const index = recentSpecs.findIndex((spec) => spec.name === newSpec.name && spec.id === newSpec.id);

    if (index === -1) {
        // insert at beginning
        recentSpecs.unshift(newSpec);
    } else {
        recentSpecs[index] = newSpec;
    }

    if (recentSpecs.length > 10) {
        recentSpecs.pop();
    }

    Cookies.set('recentSpecs', JSON.stringify(recentSpecs));
}

// get recent specs
export const getRecentSpecs = () => {
    const recentSpecs = Cookies.get('recentSpecs');
    if ( !recentSpecs ) {
        return [];
    }
    return JSON.parse(recentSpecs);
}

export const setCurrentSpec = (spec, url) => {
    const specString = JSON.stringify(spec);
    const base64Spec = btoa(specString);
    const obj = { spec: base64Spec, url: url, date: Date.now() };

    Cookies.set('currentSpec', JSON.stringify(obj));
}

export const getCurrentSpec = () => {
    const cookie = Cookies.get('currentSpec');
    if ( !cookie ) {
        return null;
    }

    const currentSpec = JSON.parse(cookie);

    // recode base64 spec
    console.log('CURRENT SPEC', currentSpec);
    currentSpec.spec = JSON.parse(atob(currentSpec.spec));

    return currentSpec;
}