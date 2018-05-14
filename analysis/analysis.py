import pandas as pd
import numpy as np 
import matplotlib.pyplot as plt 
import seaborn as sns 

# read csvs into dataframes 
turnout = pd.read_csv('../data/cvap.csv')
vote = pd.read_csv('../data/vote.csv')

# list of columns I want from vote dataframe
cols = ['fips', 'election' ,'state', 'county', 'democrat', 'republican', 'total' , 'democrat_percent' ,'democrat_margin_percent']

# merges data frames
vote = pd.merge(turnout[['fips', 'election', 'cvap']], vote[cols], on=['fips', 'election'])
vote['turnout'] = vote['total'] / vote['cvap']
vote.sort_values(['fips', 'election'], inplace=True)

# calculate turnout change 
vote['turnout_change'] = vote[['fips', 'turnout']].groupby('fips').diff()

# shift up to get 2012 vote as a datapoint in row

# filter to just 2016
vote = vote.query('election == 2016')