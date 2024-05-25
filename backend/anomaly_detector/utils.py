import random


def make_prediction(X, tag):
    result = {
        'value': X[tag],
        'is_anomaly': random.choice([True, False]),
        'probability': 70
    }

    return result
