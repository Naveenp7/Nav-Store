/**
 * Firebase Index Creation Instructions
 * 
 * The error you're seeing is because Firebase requires a composite index for queries
 * that combine filtering (where) with ordering (orderBy).
 * 
 * To fix this issue, you need to create a composite index in your Firebase console.
 * 
 * Follow these steps:
 * 
 * 1. Go to the Firebase console: https://console.firebase.google.com/
 * 2. Select your project: "nav-store-69fdb"
 * 3. In the left sidebar, click on "Firestore Database"
 * 4. Click on the "Indexes" tab
 * 5. Click on "Create index"
 * 6. For "Collection", select "projects"
 * 7. Under "Fields to index", add the following fields:
 *    - Field path: "featured", Order: Ascending
 *    - Field path: "createdAt", Order: Descending
 * 8. For "Query scope", select "Collection"
 * 9. Click "Create index"
 * 
 * Alternatively, you can click on the link in the error message which will take you
 * directly to the index creation page with the fields pre-filled.
 * 
 * The index may take a few minutes to build. Once it's ready, the real-time queries
 * will work correctly.
 * 
 * Until the index is ready, the app will use a fallback approach that doesn't require
 * the composite index (filtering by "featured" without ordering, then sorting manually
 * in JavaScript).
 */

console.log(`
=======================================================
FIREBASE INDEX CREATION INSTRUCTIONS
=======================================================

1. Go to Firebase console: https://console.firebase.google.com/
2. Select project: "nav-store-69fdb"
3. Click "Firestore Database" in the sidebar
4. Go to the "Indexes" tab
5. Click "Create index"
6. Set up the index:
   - Collection: projects
   - Fields to index:
     * featured (Ascending)
     * createdAt (Descending)
   - Query scope: Collection
7. Click "Create index"

Alternatively, click the link in the error message.
The index may take a few minutes to build.

The app will work with a fallback method until the index is ready.
=======================================================
`); 