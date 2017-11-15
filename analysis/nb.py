import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# creates pandas data frames for 2016 results
vote = pd.read_csv('data/vote.csv')
vote = vote[vote['election'] == 2016]   
vote.set_index(['fips', 'election'], inplace=True)

# set national votes
dem_pop_vote = vote['dem'].sum()
rep_pop_vote = vote['rep'].sum()
other_pop_vote = vote['other'].sum()
dem_natl_percent = vote['dem'].sum() / vote['total'].sum()
rep_natl_percent = vote['rep'].sum() / vote['total'].sum()
other_natl_percent = vote['other'].sum() / vote['total'].sum()
vote['other_natl_difference'] = vote['other_percent'] - other_natl_percent
vote['natl_dem_margin_difference'] = vote['dem_percent'] - dem_natl_percent 

# creates population density series
population = pd.read_csv('data/population.csv', index_col='fips')
area = pd.read_csv('data/area.csv')
area['election'] = 2016
area.set_index(['fips', 'election'], inplace=True)
vote['pop_density'] = population['2016'] / area.area

