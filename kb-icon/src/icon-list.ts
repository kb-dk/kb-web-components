import * as twitter from "./icons/twitter.js";
import * as linkedin from "./icons/linkedin.js";
import * as facebook from "./icons/facebook.js";
import * as instagram from "./icons/instagram.js";

interface Icon {
    default: string;
    title: string;
    tags: string;
}

export const icons: Icon[] = [];
icons['twitter'] = twitter;
icons['linkedin'] = linkedin;
icons['facebook'] = facebook;
icons['instagram'] = instagram;