
# Things to do

- [x] demonstrate loading from a fake protocol into an `iframe`
- [ ] create a `BrowserView` that's attached to an element that can load from `ipfs`
- [ ] set up js-ipfs and integrate it such that it works
- [ ] outside of the app (in scratch code)
    - [ ] publish a few small entries as their own blocks (CAR?)
    - [ ] publish a list of them as IPLD lists of links
    - [ ] resolve an IPNS to that list of links (and make it easy to update)
- [ ] in the app
    - [ ] store some IPNS to pull from
    - [ ] render feed entries
        - [ ] pure text entry (or just MD?)
        - [ ] HTML+files entry, including metadata extraction to show in small and the full thing
    - [ ] make it easy to post new entries
        - [ ] pure text
        - [ ] a simple HTML+file variant
        - [ ] update IPLD list, including pagination
        - [ ] IPNS updating

- [ ] Compare with IPP and Dave's thing

- [ ] resolve an IPID DID to the IPNS-resolved feed
- [ ] self-modifying entries?
- [ ] installable entries
- [ ] intents?
    - [ ] would it make sense to make intents controlled via UCANs? Different sources could have different
        wiring.
