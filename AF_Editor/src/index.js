const { app, BrowserWindow, Menu, MenuItem} = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const template = [
  {
    label: 'File',
    submenu:[
      {
        label: 'New',
        role: 'New',
        click: async function() {
          const { exec } = require('child_process');

          const { dialog } = require('electron');
          const result = await dialog.showOpenDialog({
            properties: ['openDirectory']
          });
          if (!result.canceled) {
            const selectedDir = result.filePaths[0];
            const shellCmdsDir = path.join(__dirname, '..', 'shell_commands/CreateNewProject.sh');
            exec(`${shellCmdsDir} ${selectedDir}`, (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
        }
      },
    },
    {
      label: 'Open',
      role: 'Open'
    },
    {
      label: 'Save',
      role: 'Save'
    },{
      label: 'Quit',
      role: 'Quit'
    }
  ],
  
},
{
  label: 'Edit',
  submenu: [
     {
        role: 'undo'
     },
     {
        role: 'redo'
     },
     {
        type: 'separator'
     },
     {
        role: 'cut'
     },
     {
        role: 'copy'
     },
     {
        role: 'paste'
     }
  ]
},

{
  label: 'View',
  submenu: [
     {
        role: 'reload'
     },
     {
        role: 'toggledevtools'
     },
     {
        type: 'separator'
     },
     {
        role: 'resetzoom'
     },
     {
        role: 'zoomin'
     },
     {
        role: 'zoomout'
     },
     {
        type: 'separator'
     },
     {
        role: 'togglefullscreen'
     }
  ]
},

{
  role: 'window',
  submenu: [
     {
        role: 'minimize'
     },
     {
        role: 'close'
     }
  ]
},

{
  role: 'help',
  submenu: [
     {
        label: 'Learn More'
     }
  ]
}
]

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.on('ready', createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on('New', () =>{
  console.log("Create New Folder");
});
