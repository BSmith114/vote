import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# creates pandas data frames
vote = pd.read_csv('data/vote.csv')
population = pd.read_csv('data/population.csv', index_col='fips')
area = pd.read_csv('data/area.csv', index_col='fips')

# updates vote to handle only 2016
# vote = vote[vote['election'] == 2016]

# set fips as vote index
vote.set_index(['fips', 'election'], inplace=True)

# create new variables
# population denisty
vote['pop_density'] = population['2016'] / area.area