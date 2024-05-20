import { JobData, sallaries } from "../types/type";

export const processData = (data: sallaries[]): JobData[] => {
    const jobDataByYear: { [year: number]: JobData } = {};
  
    data.forEach((item) => {
      const year = item.work_year;
      const salary = item.salary_in_usd;
  
      if (!jobDataByYear[year]) {
        jobDataByYear[year] = {
          year,
          totalJobs: 0,
          averageSalary: 0,
        };
      }
  
      jobDataByYear[year].totalJobs += 1;
      jobDataByYear[year].averageSalary += salary;
    });
  
    const processedData: JobData[] = Object.values(jobDataByYear).map((jobData) => ({
      ...jobData,
      averageSalary: Math.round(jobData.averageSalary / jobData.totalJobs),
    }));
  
    return processedData;
  };