--DROP TABLE annual_nasa_budget;

create table annual_nasa_budget(
	entity VARCHAR NOT NULL, 
    code VARCHAR NOT NULL,  
    year INT NOT NULL,      
    annual_budget BIGINT NOT NULL  
);

select * from annual_nasa_budget;

--Drop table international_space_budget;

create table international_space_budget(
        
    name VARCHAR NOT NULL,     
    budget_2008 FLOAT,             
    budget_2009 FLOAT,             
    budget_2010 FLOAT,             
    budget_2011 FLOAT,             
    budget_2012 FLOAT,            
    budget_2013 FLOAT,             
    budget_2014 FLOAT,             
    budget_2015 FLOAT,             
    budget_2016 FLOAT,             
    budget_2017 FLOAT,             
    budget_2018 FLOAT,             
    budget_2019 FLOAT,             
    budget_2020 FLOAT              
);

select * from international_space_budget;