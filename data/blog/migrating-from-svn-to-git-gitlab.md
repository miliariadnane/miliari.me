---
title: My migration journey from SVN to Git (GitLab)
date: '2022-02-02'
tags: ['DevOps', 'GIT', 'SVN']
draft: false
summary: 'How to derive the OLS Estimator with matrix notation and a tour of math typesetting using markdown with the help of KaTeX.'
---

![svn2git illustration](/static/images/svn2git/svn2git.gif)

Recently, my team decided to migrate our control version system from SVN to GIT for many reasons, the main one is to improve the way in which we manage our code versioning, plus a part where we would manage our Continuous Integration and Delivery using GitLab. While I would mention that many companies still working with SVN, it seems to me that sooner or later those companies will migrate to GIT, they attend just the best moment to start using git.

Before we get into our topic and the main steps to make the migration, I will quickly explain the difference between SVN and git :

## 1. What is the difference between SVN and GIT ?

Version control systems fall into two categories: `centralized`(SVN) and `distributed`(GIT).

In `centralized systems`, every user or member in the project connects to a central server to get the latest code copy and share the changes with others. So, in this case, subversion (SVN) and Team Foundation Server(TFS) are examples of centralized version control. The problem of this kind of version control system is the single point of failure, more clearly, if the server goes offline, the team can’t collaborate over the project, so they have to wait until the server comes back online. In addition to all this, operations like branching and merging are slow and painful.

![Centrelized Version Control System](/static/images/svn2git/centalized-system.png)

In `distributed systems`, we don’t have these difficulties, because every team member has a copy of the project with history under the machine, so we can save snapshot of our project, locally on our machine, and if the central server goes down (offline), we can synchronize our work directly with the other member of the team. Git is an example of distributed control system.

![Distributed Version Control System](/static/images/svn2git/distributed-system.png)

To recap, the major and perhaps best-known difference is in the core architecture, as shown in the following illustration :

![GIT vs SVN](/static/images/svn2git/git-svn-architecture.png)

> Photo by [Tabnine](https://www.tabnine.com/blog/svn-vs-git/)

Now, git is the most popular version control because it's:

- Free
- Fast
- Open-source
- Scalable

Despite all those benefits of GIT, no one can discuss the advantage of security that centralized systems provide.

## 2. git-svn tool !!

During my journey, I have used git-svn; [git-svn is a git command that allows using git to interact with subversion repositories. It’s a part of git, meaning that is not a plugin but actually bundled with git installation.](https://gist.github.com/rickyah/7bc2de953ce42ba07116)

> Important ⇒ You need to use the command git svn whitout the hypen ‘-’. You can see all these migration steps in the GitLab documentation in the following link:
>
> - https://docs.gitlab.com/ee/user/project/import/svn.html (See “cut over migration with svn2git” section).

## 3. Migration steps

### 3.1. Prepare the list of author names :

Foremost, you need to create a list of authors representing each person committing to the system. So subversion records all those authors. Using the log output from svn in XML format, you can generate this list. Next, you need to keep just the lines with author information by eliminating duplicates, then save the result in a TXT file called “authors.txt”.

Command to generate the list :

```
svn log --quiet | grep -E "r[0-9]+ \| .+ \|" | cut -d'|' -f2 | sed 's/ //g' | sort | uniq > authors.txt
```

the output of “authors.txt” file should look like this :

```
miliariadnane = Miliari Adnane <miliariadnane@example.com>
johndoe = John Doe <johndoe@contact.com>
...
```

### 3.2. Create a local copy of the repository (cloning the repository) :

After that, you have prepared the list of authors, and the next step is to create a local copy of the repository with command. But after that, you should specify your use case.

▣ If you don’t care about the standard layouts like tags, branches, trunk… So you can run the following command :

```
git svn clone SVN_REPO_URL --authors-file=PATH_TO_AUTHORS_FILE
```

▣ If you do care, and you have standard layouts (trunk/tags/branches), then you can save some typing:

```
git svn clone -s SVN_REPO_URL --authors-file=PATH_TO_AUTHORS_FILE
```

> -s is the short form of “--stdlayout”

▣ Last case, If you do care, and there is a non-standard layout, then you can specify each path name as fellow :

```
git svn clone -T MY_TRUNK -b MY_BRANCHES -t MY_TAGS SVN_REPO_URL --authors-file=PATH_TO_AUTHORS_FILE
```

> - -T ⇒ --trunk
> - -t ⇒ --tags
> - -b ⇒ --branches

`MUST READ` : Cloning big SVN repositories can take a long time.

> - If you are cloning a repository with a lot of commits, you can use the --no-metadata option to skip the metadata export. This will speed up the cloning process.
> - Or you can create a script to run the command multiple times in parallel. For example, you can use the following script to clone the repository in parallel :

```
#!/bin/bash
# svn repositories url
repos = (
  "https://svn.example.com/repo1"
  "https://svn.example.com/repo2"
  "https://svn.example.com/repo3"
  "https://svn.example.com/repo4"
  "https://svn.example.com/repo5"
)

# loop through the repos
for repo in "${repos[@]}"; do
  git svn clone -s $repo --authors-file=PATH_TO_AUTHORS_FILE
done
```

### 3.3. Migrate svn repository to gitlab :

1. Adding your repo as remote origin :

```
git remote add origin git@gitlab.com:<group>/<project>.git
```

2. Push the project :

```
git push origin --all
git push origin --tags
```
