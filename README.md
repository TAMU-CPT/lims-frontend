# LIMS

CPT Lab Information Management System

This system will track biological samples from collection through sequencing,
annotation, and publishing.

TODO List:


- [ ] Can we automatically build a Database Schema Map? Is there a python
  module that will do this from Django?
- [ ] Bioproject
	- [ ] Project access control
		- [ ] Use md-autocomplete for entering user/group names
		- [ ] Once a name is selected, add it to the list with default "View only" permission + clear autocomplete
		- [ ] Allow users to change permission level
		- [ ] Ensure that they are always on the bioproject that they created
	- [ ] "Add phage" interface (HXR)
- [ ] Phage page needs cards
	- [x] Environmental Sample Collection Location
	- [ ] Sample collection map
	- [x] Lysate
	- [ ] Sequencing Run information
		- Just a short card mentioning which run / pool it is part of + link
	- [ ] Assembly
		- Probably a simple link to the assembly detail route will be fine. Not a lot of info here.
	- [ ] Annotation
		- Link to Galaxy histories / Apollo stuff (TODO: figure out how to link entries in this DB with genomes in Apollo)
	- [ ] Publication(s)
		- [ ] Box for DOI / notes field for tracking genomeA stuff.
		- [ ] add model in django side
- [ ] All list routes need a search box like is one phage route (css there lets it be inline nicely with the header)
- [x] Directory
	- [ ] Organisation List
		- [x] Basic Implementation
		- [ ] Org admins should be able to update records of their members.
	- [ ] People list
		- [x] Basic Implementation
		- [ ] People should be able to update their own record but no one elses.
- [ ] Environmental Sample Detail Route
	- This represents a single sample from the environment
	- [ ] Map
	- [ ] Identity of person who collected it
- [ ] Environmental Sample Collection Detail Route
	- This represents a group of samples from the environment when the crazy
	  people decide to mix their environmental samples and collect random
	  phages from them.
	- [ ] When number of samples in collection = 1, then it is identical to the environmental sample detial route
	- [ ] When >1, then we show multiple pins on a map.
	- [ ] Maybe if we have this ruote, we don't need EnvSample detail route?
- [ ] Boxes
	- [ ] Create
	- [ ] Edit
	- [ ] Delete
- [ ] Storage Location (Fridge)
	- [ ] Create
	- [ ] Edit
	- [ ] Delete
	- [ ] Add / remove boxes
- [ ] Assemblies
	- [ ] Galaxy tool for registering assembly / genomes with LIMS maybe? I do
	  not know how this integration should work, just that it should be
	  maximally transparent to end user.
	- [ ] Assembly detail view will mostly be empty, someday would be interesting to visualize assemblies somehow. Maybe link to Apollo + sequencing data?
- [ ] Experiments
	- This service provides a catalog of experiments and metadata about the experiments (even protocol)
	- [ ] Create
	- [ ] Edit
	- [ ] Delete
	- [ ] Detail view
		- [ ] Link to uses of this experiment / results
- [ ] Experimental Results
	- [ ] Create
	- [ ] Edit
	- [ ] Delete
	- This will be a specific result from running a specific experiment above.
	  We'll use this to keep track of things more generically like "dna
	  concentration" of a sample
	- [ ] need to add a `type` to the django model, with things like `image_url`, `url`, `number` (float)
	- [ ] The frontend should have a filter function to render all of these different result types.
- [ ] Sequencing Run
	- [ ] Create
	- [ ] Edit
	- [ ] Delete
	- Collection of samples (PhageDNAPrep) in, split into pools, output as assemblies
	- [ ] UI should allow adding samples easily + re-arranging into pools
- [ ] Bacteria
	- [ ] Create
	- [ ] Edit
	- [ ] Delete
	- [ ] Link to phage list filtered by those that grow on this host


Install requirements and run:
```console
$ make
```

That's it! By default, your server will be running on port 10000 and pointing at
port 8000 for the backend.
