# Connections-Game-

## Description

Connections Game is an online game that guides you to find groups of four words that are related to one another. Your task is to score as many points as possible by identifying all the connections before your successful guesses accumulate to more than four mistakes. After each guess, a relatively color-coded banner creates and replaces the rows after each match; displaying difficulty in the banner allows players to know what difficulty they achieved.

## Technologies Used

- HTML
- CSS
- JavaScript

## Steps Taken

- From there I started defining the game mechanics in basic terms and working out the user flow, where it would be easy for a user to ‘drag’ one word to another to connect them and click buttons to submit answers.

- To make the game more responsive and user-friendly, I introduced a scoring system and feedback for correct and incorrect guesses. JavaScript arrays and DOM manipulation were used to handle the game logics and update status at runtime.

- One of the first things I developed was the help box feature, which offers players guidelines and instructions on how to play. I placed the help box within a modal-style overlay in order to make sure that this information doesn’t intrude the game context and that players can access it without leaving the game environment.

## Live Site Link

https://spookyreaper.github.io/Connections-Game-/

## Installation Instructions

To run this game locally:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.
3. Enjoy the game!

## Wireframes

![Photo_1](/WireFrames/wireFrame_1.jpeg)

![Photo_2](/WireFrames/wireFrame_2.jpeg)

![Photo_3](/WireFrames/wireFrame_3.jpeg)


## Links 

https://trello.com/invite/b/qi2sjQZK/ATTI82b6b88575514d55692c2f417879afc41EC9F5B9/connections

keyframe animation: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes

Fade in animation: https://blog.hubspot.com/website/css-fade-in

fonts: https://fontawesome.com/

image: https://www.freepik.com/free-vector/linear-flat-abstract-lines-pattern_13819726.htm#query=box%20pattern&position=1&from_view=keyword&track=ais&uuid=f08c94a5-9a6d-4e86-9055-b12e966ff607


## Challenges/Unsolved Problems

Ensuring unique words within tiles after a match

- Challenge: One of the biggest challenges  during  development was ensuring that words in tiles do not repeat after a user is successfully assigned to a group.
It was very important to fix this issue  because repeating words can confuse players and disrupt the gaming experience.

- Solution: To resolve this issue, I implemented a filtering mechanism within the assignTileContent function.
This mechanism first collects all unmatched words from the connection_words array.
Before these words are assigned to  tiles, the function filters out all words that have already been matched and are present in the matchedWords array.
This approach ensures that only new words that don't match on the tiles appear, keeping the game challenging and exciting.

Creating a dynamic banner after user matches the words 

- Challenge: Another challenge is to design and implement a feature  that displays a banner that replaces a row on the game board when the user  matches a group of words. To improve the user experience, banners needed to be informative, display categories and appropriate words, and be visually appealing.

- Solution: The solution was to create a displayBanner function that dynamically generates a banner element when called.
This function takes the category, difficulty level, target line, and  words to display as arguments.
 Depending on the difficulty  of the matched group, the  background color of the banner changes, giving players instant visual feedback.
The function then replaces the contents of the specified row with this newly created banner.
To add an fine touch, CSS animations (Banner Appear Animation) are applied to smooth the transition of the banner  into view.


Although I managed to create everything on my wireframe,I know that there's room for improvement, like adding another puzzle or making it mobile-friendly.




## Disclaimer

This is a personal, non-commercial, educational project that builds on the Word Connection Games in The New York Times (NYT). This project is neither endorsed by, maintained by, authorized by, or affiliated with The New York Times Company or by any of its affiliates.

All code is original and created solely by the project’s author(s). No copyright infringement is implied through the use of third-party trademarks. This project is for educational purposes and is not intended for commercial use. It is released as open-source code.

Note: the underlying concept and game design itself is the intellectual property of whoever originally created it, and any repeat of the concept is merely provided to showcase coding ability and is not meant to infringe.

For any concerns or takedown requests, please contact me Brandon.Alvarado9991@gmail.com




