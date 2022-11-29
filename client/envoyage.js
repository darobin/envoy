
// import that just runs whatever must be set before the other imports load
import './import-env.js'

// state
import './db/model.js';
import { initIdentities}  from './db/identities.js';
import './db/router.js';

// elements
import './el/envoy/404.js';
import './el/envoy/header.js';
import './el/envoy/card.js';
import './el/envoy/main.js';
import './el/envoy/root-route.js';
import './el/envoy/create-identity.js';
import './el/envoy/show-identity.js';
import './el/envoy/box.js';
import './el/envoy/image-drop.js';

await initIdentities();
