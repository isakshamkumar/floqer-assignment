
import { Table, Divider, Typography, Layout } from "antd";
import { sallaries } from "../data/sallaries";
import { JobData, JobTitleData } from "../types/type";
import { processData } from "../lib/ProcessData";
import LineGraph from "../components/LineGraph";
import { jobTitlesTableColumns } from "../utils/constant";
import { useEffect, useState } from "react";



export const SallaryData = () => {
  const [data, setData] = useState<JobData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [jobTitlesData, setJobTitlesData] = useState<JobTitleData[]>([]);

  useEffect(() => {
    const processedData = processData(sallaries);
    setData(processedData);
  }, []);

  const handleRowClick = (record: JobData) => {
    setSelectedYear(record.year);
    const jobTitlesForYear = processJobTitles(sallaries, record.year);
    setJobTitlesData(jobTitlesForYear);
  };

  const processJobTitles = (data: any[], year: number): JobTitleData[] => {
    const jobTitles: { [jobTitle: string]: number } = {};

    data.forEach((item) => {
      if (item.work_year === year) {
        const jobTitle = item.job_title;
        jobTitles[jobTitle] = (jobTitles[jobTitle] || 0) + 1;
      }
    });

    return Object.entries(jobTitles).map(([jobTitle, count]) => ({
      jobTitle,
      count,
    }));
  };
  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a: JobData, b: JobData) => a.year - b.year,
    },
    {
      title: "Total Jobs",
      dataIndex: "totalJobs",
      key: "totalJobs",
      sorter: (a: JobData, b: JobData) => a.totalJobs - b.totalJobs,
    },
    {
      title: "Average Salary (USD)",
      dataIndex: "averageSalary",
      key: "averageSalary",
      sorter: (a: JobData, b: JobData) => a.averageSalary - b.averageSalary,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: JobData) => (
        <button onClick={() => handleRowClick(record)}>View Job Titles</button>
      ),
    },
  ];
  return (
    <Layout.Content>
      <LineGraph />

      <Table
      style={{padding:'0 2.5rem'}}
        dataSource={data}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowKey={(record) => `${record.year}-${record.totalJobs}`}
        rowClassName={(record) =>
          record.year === selectedYear ? "selected-row" : ""
        }
      />
      {selectedYear && (
        <div>
          <Divider />
          <Typography.Title style={{ paddingLeft: "3.5rem" }} level={4}>
            Job Titles for {selectedYear}
          </Typography.Title>
          <Table
            dataSource={jobTitlesData}
            columns={jobTitlesTableColumns}
            rowKey="jobTitle"
            style={{ padding: "3.5rem" }}
          />
        </div>
      )}
    </Layout.Content>
  );
};

export default SallaryData;
