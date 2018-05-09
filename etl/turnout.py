import os
import numpy as np 
import pandas as pd 
import vote

'''
cleans up raw cvap file from census for 2016
'''

raw_data_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..','raw-data'))
clean_data_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..','data'))

# reads cvs into dataframe
cvap = pd.read_csv(os.path.join(raw_data_path,'cvap-2016.csv'))

# creates new CVAP columns fips and election
cvap['fips'] = cvap['GEOID'].str[-5:].astype(int)
cvap['election'] = 2016 

# filtes cvap to total voters
cvap = cvap.query('LNNUMBER == 1')
cvap = cvap[['fips','election','CVAP_EST']]

# resets index
cvap.reset_index(inplace=True)
cvap.rename(columns={'CVAP_EST': 'cvap'}, inplace=True)
cvap.drop(columns=['index'], inplace=True)

cvap.to_csv(os.path.join(clean_data_path, 'cvap.csv'))