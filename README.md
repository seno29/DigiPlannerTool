# DigiPlanner

This is an angular application build as a part of DigiPlanner App which is being used by teams in RFT and PI planning.This application covers requirement of collaborative white boarding tool where multiple team members can join the board and take part in discussion. Every change that is made on discussion board by any of the member is visible to all other members enabling them to brainstrom and collaborate on certain ideas.

### Key Features:

1. Users are authenticated via google sign in.
2. Admin can create board and set a layout for discussion which is not editable by other users.
3. Multiple users can join board using a roomcode shared by admin.
4. Users can view boards they have created or have been a part of.
5. Different shapes can be added on board like rectangle, circle, ellipse and triangle. Shapes can be	rotated, moved and scaled on the board, two shapes can also be connected through a line by double clicking on shapes to be connected in the connect mode. Text can be added on the shapes, if text gets bigger shapes can adjust their size to fit the text. Different colors are provided to change the color of shapes.
6. Board can also be exported as image.
7. Pen tool for doodling on the board.

### Tech Stack:
	Frontend - Angular
	Backend - NodeJS  [DigiPlannerToolBackend](https://github.com/vgmehta/DigiPlannerToolBackend)
	Database - Redis
