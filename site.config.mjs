export const site = {
  name: 'Freeware Catalog / The tool shelf',
  // GitHub Actions supplies the actual deployed URL. Set SITE_URL locally to preview metadata.
  url: process.env.SITE_URL || 'https://dstvhgp4sm-png.github.io/freewarecatalog-index/',
  indexNowKey: '55f3440848af4d35949facdeac5b6f0e',
  modified: '2026-10-02',
};
export const pages = [
  { path: '', title: 'Free desktop software, organised by task | Freeware Catalog', description: 'Explore a focused shelf of free desktop software for files, writing, creative work and everyday browsing. Read the full details at Freeware Catalog.' },
  { path: 'about/', title: 'About the tool shelf | Freeware Catalog', description: 'An independent companion to Freeware Catalog: a small, practical selection of free desktop tools, linked to their full catalogue pages.' },
  { path: 'privacy/', title: 'Privacy | Freeware Catalog tool shelf', description: 'How this static GitHub Pages site handles browsing, local preferences and links to the main Freeware Catalog website.' },
];
export const apps = [
  {name:'7-Zip', slug:'7-zip', group:'Files & connections', icon:'archive', platforms:['Windows'], summary:'Compress a project, unpack an archive, or keep a smaller copy of a large folder.', detail:'Start here when the job is an archive, not a cloud storage service.'},
  {name:'PuTTY', slug:'putty', group:'Files & connections', icon:'terminal', platforms:['Windows'], summary:'Open an SSH session and manage an authorised remote machine from a compact terminal.', detail:'Have the server address, account details and host-key fingerprint ready.'},
  {name:'WinSCP', slug:'winscp', group:'Files & connections', icon:'transfer', platforms:['Windows'], summary:'Move files between your computer and a server with a visual, two-pane workspace.', detail:'A good companion to a terminal when you need to see the files you are moving.'},
  {name:'Notepad++', slug:'notepad-plus-plus', group:'Writing & work', icon:'code', platforms:['Windows'], summary:'Edit source files and plain text, compare tabs, and search across a working folder.', detail:'For text and code rather than page layout or a full office document.'},
  {name:'LibreOffice', slug:'libreoffice', group:'Writing & work', icon:'document', platforms:['Windows','macOS','Linux'], summary:'Work on documents, spreadsheets and presentations in a desktop office suite.', detail:'Keep editable originals and check formatting when sharing between office suites.'},
  {name:'Bitwarden', slug:'bitwarden', group:'Everyday essentials', icon:'lock', platforms:['Windows','macOS','Linux'], summary:'Keep account credentials in a password manager rather than a scattered set of notes.', detail:'Review the free plan and optional paid features before choosing your setup.'},
  {name:'Mozilla Firefox', slug:'mozilla-firefox', group:'Everyday essentials', icon:'browser', platforms:['Windows','macOS','Linux'], summary:'Browse the web with extensions, saved bookmarks and configurable privacy settings.', detail:'Check the defaults and choose the settings that fit how you actually browse.'},
  {name:'VLC media player', slug:'vlc-media-player', group:'Audio & video', icon:'play', platforms:['Windows','macOS','Linux'], summary:'Play local video and audio in a dedicated player with support for many media formats.', detail:'Useful for a media library without turning playback into a subscription.'},
  {name:'Audacity', slug:'audacity', group:'Audio & video', icon:'wave', platforms:['Windows','macOS','Linux'], summary:'Record, trim and edit audio for a voice track, an interview or a small sound project.', detail:'Save a working project before exporting the final audio file.'},
  {name:'OBS Studio', slug:'obs-studio', group:'Audio & video', icon:'record', platforms:['Windows','macOS','Linux'], summary:'Build scenes from screen, camera and audio sources for recording or streaming.', detail:'Make a short test recording to check levels and capture settings first.'},
  {name:'GIMP', slug:'gimp', group:'Design & 3D', icon:'image', platforms:['Windows','macOS','Linux'], summary:'Edit raster images with layers, selections and a project-based workflow.', detail:'Keep the editable project separate from the image you export for sharing.'},
  {name:'Blender', slug:'blender', group:'Design & 3D', icon:'cube', platforms:['Windows','macOS','Linux'], summary:'Model, light and render a 3D scene in one creative workspace.', detail:'Begin with a small scene and an organised project folder.'},
];
