export default {
    get(options: Object = {}) {
        var search;
        var params;

        //@ts-ignore
        if (window.origin === "null" || options.pushStateSupport === false) {
            var parts = window.location.hash.split("?");
            if (parts.length < 2) {
                return {};
            }
            params = parts[1];
        } else {
            params = window.location.search.substr(1);
        }

        try {
            search = JSON.parse(atob(params));
        } catch (e) {
            if (e) return {};
        }

        return search;
    },
    set(query: object) {
        var search = btoa(JSON.stringify(query));
        //window.location.search = search
        return search;
    },
};