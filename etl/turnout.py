import os
import numpy as np 
import pandas as pd 

'''
cleans up raw cvap file from census for elections
'''

raw_data_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..','raw-data'))
clean_data_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..','data'))

dfs = []

for election in [2012, 2016]:
    # cvap file path
    cvap_file = os.path.join(raw_data_path, 'cvap-' + str(election) + '.csv')

    # reads cvs into dataframe
    cvap = pd.read_csv(cvap_file)

    # creates new CVAP columns fips and election
    cvap['fips'] = cvap['GEOID'].str[-5:].astype(int)
    cvap['election'] = election 

    # filtes cvap to total voters
    cvap = cvap.query('LNNUMBER == 1')
    cvap = cvap[['fips','election','CVAP_EST']]
    cvap.rename(columns={'CVAP_EST': 'cvap'}, inplace=True)

    # appends dataframe to list
    dfs.append(cvap)

# concats dataframes for all years
cvap = pd.concat(dfs)

# resets index
cvap.reset_index(inplace=True)
cvap.drop('index', inplace=True, axis=1)

# adds turnout change for 2016

# creates dataframe turnout dataframe
