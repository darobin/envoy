
// import that just runs whatever must be set before the other imports load
import './import-env.js'

// state
import './db/model.js';
import { initIdentities }  from './db/identities.js';
import './db/navigation.js';
import './db/router.js';

// elements
import './el/envoyager/404.js';
import './el/envoyager/header.js';
import './el/envoyager/card.js';
import './el/envoyager/main.js';
import './el/envoyager/root-route.js';
import './el/envoyager/create-identity.js';
import './el/envoyager/show-identity.js';
import './el/envoyager/box.js';
import './el/envoyager/image-drop.js';
import './el/envoyager/loading.js';
import './el/envoyager/feed-list.js';
import './el/envoyager/intent-list-modal.js';

await initIdentities();
