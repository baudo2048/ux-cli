# ux cli for ux lang
Generate static html application.  
You can use ux cli to generate single file html web app that you can share with your team or publish on a web sever.

Installation
```
npm install -g ux-cli
```
Don't be shy and don't worry about nothing, if you don't like *ux-cli* just run the following command the everything will be removed from your computer:

```
npm uninstall -g ux-cli
```

# Basic usage
The syntax of ux-cli is straightforward:

```
c:\> ux <command-name>
```

List of commands:

```
add-comp
bundler-html
create-project
dev-listener
list-comps
save-comp
upd-comp
```

If a command need parameters don't worry about that, the command itself will ask you what he need.  
For example, *create-project* need to know the name of your new project so you just run the command:
```
ux create-project
```
And he will ask you what needed:
```
projectName (prj-ux):
```
In the above prompt you can see *prj-ux* inside a rounded bracket. That is your choose if you just hit *enter*.



# The html bundle
Run the following command to generate your application:

```
ux bundler-html
```

The above command generate an *index.html* file under your *dist* folder. To run the application just open the *dist* folder and double click on the generated *index.html* file.  

You can also run from VS Code from the context menu *Open with Live Server*. 


# Why another web framework?
**ux ecosystem** is meant to be used for:

- Fast prototyping
- Make ui development fun again
- You need an user interface for your desktop application.
- Get rid of html verbose syntax


## Philosophy
To be fast we get rid of concepts other frameworks use instead of implementing it.  
For example with *ux-app* you no need:
- Routing


# Technical details
ux-cli uses [ux-lang](https://github.com/baudo2048/ux-lang) as its core.  
To use ux-cli you no need manually install *ux-lang* package because it already ships with the *ux-cli*. 





# Next step
- Learn simple ux-lang syntax: [ux-lang syntax](https://github.com/baudo2048/ux-lang/tree/main/doc)
- Check for template and components on [ux-library](#)

# Get involved
UX Ecosystem was born no long time ago.  
We miss functionality we want to include inside it, so it's your turn!  
We're not super expert, we just love create user interface for our projects.  
Things are made easy because we want get to the point and we want understand what is happening under the hood. 

- Documentation
- Create new ux commands
- Create new parsers
- Extends events architecture
- Extends server architecture
- Create and publish new components
- Create vs code extension for ux ecosystem
