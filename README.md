A simple adventure game by Daniel Bustan based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: scene1, scene2, scene3, scene4.
- **2+ scenes *not* based on `AdventureScene`**: Intro, GoodOutro, BadOutro.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: ArrowCreation(x, y, rotation, message, scene, bounceIn,        bounceOut). Creates an arrow given the x, y, rotation, message, scene 
       to traverse to, as well as the animation size for hovering in and out        of it.
    - Enhancement 2: createContainer(image, text, x, y, scale) creates an            a container that holds text + image given the image, text to appear
       next to it, an x, a y, and the size desired on the image.
    - Enhancement 3: BounceProperty(Object, scaleOn, scaleAfter) creates a
      bounce property given the object, the size to scale to when hovered on,       the size to scale to when not hovered.

Experience requirements:
- **4+ locations in the game world**: Troll, Scene1, Scene2, Scene3, Scene4.
- **2+ interactive objects in most scenes**: You can pick up a Kiryu Duck in scene 2, You can pick up a Dirt Block in Scene 1. 
- **Many objects have `pointerover` messages**: When hovering over the button in Scene 3 a message shows asking if you should press this. When hovering over the lever in Scene 4 a message shows asking if you should activate it.
-
- **Many objects have `pointerdown` effects**: When interacting with the button in Scene 3 Manny's sprite disappears and the room turns dark. When interacting with the lever in Scene 4 you end the game. (describe two examples)
- **Some objects are themselves animated**: Hovering over the Dirt Block in Scene 1 it bounces in and out. Hovering over the Majima Poster in Scene 2 also causes it to bounce.

Asset sources:
- Intro contains an image created in Photoshop by me, taking my friends from the group Trash Day and putting them on a plane I drew.
- Scene 1 is an image created in Photoshop by me, through taking the poster for the Trolls movie and stretching it out, as well as generating a "hallway with a large door" in OpenAI's generative image AI. A Dirt block is present, which is from a google search ("Minecraft Dirt Block")
- Scene 2 contains an image in Photoshop drawn by me. Both a Majima Poster and a Kiryu Duck can be scene, which were found on google.
- Scene 3 contains an image in Photoshop drawn by me, as well as a picture of my good friend Manny taken from his instagram.
- Scene 4 contains an image in Photoshop drawn by me, as well as Manny's face.

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
