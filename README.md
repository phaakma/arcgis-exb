# arcgis-exb
Custom ArcGIS Experience Builder widgets and themes.

Author: Paul Haakma  

## Installation  

Refer to this documentation:  
[ArcGIS Experience Builder Guide > Widget Development > Get Started](https://developers.arcgis.com/experience-builder/guide/getting-started-widget/)

1. Install ArcGIS Experience Builder Developer Edition locally.  
2. Clone this repo into the 'client' folder. There should now be a subfolder called 'arcgis-exb'.
3. Edit the tsconfig.json file and add the name of this folder into the 'include' array. Example below.  

```
{
  "include": [
    "dist/widgets",
    "your-extensions",
    "types",
    "jimu-core/lib/types",
    /** ADD the name of your web extension repo folder: **/
    "arcgis-exb"
  ],
}
```

