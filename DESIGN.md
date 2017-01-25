# What this System Tracks and Why

- Environmental Samples
	- These are tracked in order to collect global data we had previously been collecting and discarding.
	- They are a separate model and the entities are created separately to
	  address the specific issue where the CPT receives environmental samples
	  from outside sources. In that case we would wish to record that it was
	  from a specific location, and owned by a specific organisation. Given
	  that we may not use that sample immediately, it is thus logical to keep
	  separate.
	- The idea has been raised of recording this at different points in the
	  workflow. This is perfectly tractable, we can build multiple interfaces
	  on top of the same infrastructure, tailored to different needs that are
	  all present within the organisation.
	- This model addresses a specific issue: not being able to declare (without
	  much archival data searching) where a specific phage came from.
- Environmental Sample Collections
	- These were something that are not well tracked, and not in public
	  datasets, but due to their use in health products, we absolutely must
	  track which environmental samples the phages came from.
	- This model addresses a specific issue: we did not visibly track which
	  phages went into which samples. They were in spreadsheets not accessible
	  to relevant parties.
- Bioproject
	- This is just an overall tracking module for bringing together all facets
	  of research progress on a specific project in one location for easy
	  overview and access to sample data (sample data meaning environmental
	  samples, all intermediates that are stored permanently, sequencing data,
	  genomes, annotation, publication.)
	- This model/module addresses the lack of standard project overviews for
	  various sequencing projects. Currently there is no interoperability, and
	  replacing individuals on projects is hard or impossible. It requires the
	  previous administrator of a project to collect up possibly disparate
	  pieces of data (when they are not organised) and share this with the new
	  person. The lab version of "technical debt".
	- The response is a single, unified interface to a project that touches
	  phages. Given that the underlying data is shared/shareable, users can
	  easily add phages to their project and instanaeously have access to all
	  previous data on that phage, how it was isolated, the sequencing
	  information, etc.
- Users
	- These must be tracked for AuthN/Z purposes
	- Additional benefits include
		- the ability to automatically receive a record of everyone
		  involved in a phage, which is of interest in tracking down
		  samples and data that people failed to enter into the system.
		- the ability to use as a single backing store for our Sequin
		  tool which is currently using a hard-coded copy of an LDAP
		  server. This would allow people to be specified within the
		  LIMS interface, the LIMS to act as a person directory, and
		  Sequin to allow you to easily select people from LIMS,
		  ensuring the data is 100% correct and re-generateable in the
		  event that data was wrong.
	- This model is needed by default, no specific use case is offered as justification.
- Organisations
	- These function as groups of users
	- They are more interesting as owners of phages/env samples/lysates,
	  allowing us to figure out provenance and who to contact for more
	  details regarding specific samples.
- Lysates
	- These are currently tracked on a separate sheet and poorly linked
	  to the phage record. It is not trivial to link these two items in
	  the existing infrastructure.
	- The database model does not integrate them into the Phage model
	  due to previous concerns about a single lysate producing multiple
	  phages. E.g. multiple distinct plaque formations that appear. It
	  will be trivial to revert this to a ForeignKey whenever someone
	  realises that this functionality is needed.
	- This model is needed by default, no specific use case is offered as justification.
- Storage
	- Simplified storage interface, reduced even further.
	- This model is needed by default, no specific use case is offered as justification.
- Bacteria
	- These must be tracked as part of recording which phages grew on which hosts
	- This is now a model and not a plain text field as people showed
	  themselves to be incapable of fully specifiying bacterial
	  genus/host/species, instead reducing them to short strings that
	  were **uninterpretable without the assistance of the specific
	  individual who entered it into the spreadsheet.**
	- This model prevents that behaviour and ensures that people provide valid bacterial identities.
- Experiment
	- This model captures the details of an experiment. It is not one people
	  will interact with much as this is not intended to be a lab notebook.
	- We capture this model to address the problem of people not recording
	  sequencing experiment parameters. E.g. what type of instrument was used
	  (they tell you) and which libraries were used.
	- This is crucial information that we report in the GenomeA paper but is
	  specified only in a small fraction (<10%?) of records in our existing
	  databases.
	- This model addresses a specific issue: not knowing the sequencing methods used because they were stored in someone's memory/lab notebook.
- Experimental Result
	- This model captures the results of an experiment.
	- Likewise, end users will not see or deal with this model very often directly
	- It gives us a generic place to store arbitrary data, such as:
		- PFGE size of the phage
		- Links to images of the phage
		- Coverage experiment (with a link to a Galaxy history)
	- These all could be individual attributes on models, but given that
	  they are all "experiments", we can provide a UI that looks the
	  same, but implicitly associate them with a valid analysis that
	  should be recorded as it will be mentioned in papers. This gives
	  us a chain of evidence. For PFGE we can say "Bob ran the PFGE at
	  this time", all without user-effort over their current workflow.
- Phage
	- This model is needed by default, no specific use case is offered as justification.
- Phage DNA Prep
	- This model is needed by default, no specific use case is offered as justification.
- Sequencing Run
	- This model captures the overview of a sequencing run, which phages
	  were in which pools, what the BioAnalyzer results were, who is the
	  sequencing czar, what sequencing methods were used (Experiment
	  class)
	- This class features a number of helper methods that completely obviate the old spreadsheets.
	- The problems with spreadsheets were numerous:
		- bad excel coding practices
		- differences between spreadsheet engines
		- copy and pasting code which provides significant room for typos and other errors
		- **spreadsheets were hidden on peoples computers and hard to find during accessing archival data**
		- This spreadhseets all ran the same calculations
	- The model addresses these specific problems:
		- The sequencing data is avialable online by default, it is now
		  impossible to lose sequencing data. Unlike the past, I will not personally have
		  to dig through old PC hard drives to find where Joe Aggie
		  decided to stick his sequencing spreadsheet. I can easily find
		  it because they're all in one place with uniform display.
		- This has been an issue in the past. I could not find records of
		  phages being sequenced due to name changes and not being able to find
		  the spreadsheets for various year.
		- They capture all of the information online, because we are
		  building the infrastructure to plan sequencing runs as well as
		  process results: This is not just a spreadsheet with pools,
		  this is a spreadsheet which can help you design pools for best
		  results.
		- The code is identical on every page, and **auditable** for mistakes.
	- With the past, **we have lost phages because we could not find the
	  sequencing run spreadsheet which mentioned their sequencing, and
	  been able to track down their contigs. We do not know the end
	  closure status because it was maintained in separatespread
	  sheets**
- Sequencing Run Pool / Sequencing Run Pool Item
	- These follow from needing a Sequencing Run model.
	- They significantly streamline the process:
		- Easy access to reported storage locations of DNA preps
		- Easy access to the list of people who requested you sequencing
		  their DNA, so you can email them about upcoming run deadlines.
- Assembly
	- This model tracks assemblies of phages, the next component after
	  sequencing run results come back.
	- This is required in order to document:
		- the tool
		- the version
		- the assembly parameters
		- the input datasets
	- Currently we do not have a good tracking system for this. Our
	  papers cannot specify these things because we cannot access them.
	  With this model, we track it, it is trivial to say "This was the
	  chosen assembly for this phage, it was run with tool X, we also
	  ran another assembly with tool Y but we like this one."
	- This will let us optimise our assemblies over time, helping users pick
	  the best tool and the best parameters, and not waste their time with
	  tools that were ineffective.
- End Closure / PCR
	- We track this as it is essential to be able to say with relative certainty that a genome is closed.
	- This model is needed to track primers, the experimental status, the results of that sequencing.
	- This model addresses a specific issue: we wasted an hour in a meeting
	  because the person who had run end PCR was not available, and we could
	  not find their files to identify whether they had done the experiment and
	  what the results of the experiment were.
	- By storing the data in LIMS, we address a future issue of mapping
	  annotations. This is not a simple process, and is best left to computers
	  to do in an automated fashion. By having this model and recording data,
	  we can provide an easy button that will initiate the relevant workflows
	  and queue the updates to the analyses.
- Annotation Record
	- This is required in order to link the record in Apollo with the system.
	- Currently you cannot go from sequencing spreadsheet to seeing the annotations.
	- This allows us to link backwards as well, we can go from "hey, how was
	  this genome sequenced / assembled, I think something is missing" to see the sequencing data
	- This will allow us to load the sequencing data inside apollo easily.
	  Anyone looking at a sequence, if it went through lims, it will be easy to
	  do SNP analyses by loading up sequencing datasets.
- Publication
	- Now that we are tracking every other facet of phage existence, tracking
	  publication is only natural. It links back everyone who was involved,
	  every step of the analysis from collection in environment to submission
	  of a paper.
	- We have considered implementing GenomeA drafting software within the
	  interface. Given that people often refer to gene numbers, we can build
	  interfaces that would allow specifying the gene, and doing
	  post-processing on the paper once we have a finalised version of the
	  genome, replacing those gene identities with official gene numbers.
	- This would significantly reduce burden on writers and on viewing, as we
	  can transparently display the current gene numbers and adjust them in the
	  final version.
