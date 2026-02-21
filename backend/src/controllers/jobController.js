import Job from '../models/Job.js';

export const getJobs = async (req, res, next) => {
  try {
    const { search, location, workMode, domain, isPMScheme, page = 1, limit = 10 } = req.query;

    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    if (location) {
      filter.location = Array.isArray(location) ? { $in: location } : location;
    }

    if (workMode) {
      filter.workMode = Array.isArray(workMode) ? { $in: workMode } : workMode;
    }

    if (domain) {
      filter.domain = Array.isArray(domain) ? { $in: domain } : domain;
    }

    if (isPMScheme !== undefined) {
      filter.isPMScheme = isPMScheme === 'true';
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(filter);

    res.json({
      data: jobs,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};
