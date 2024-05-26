import random

from joblib import load


def make_prediction(X, tag):
    model = load('model.joblib')
    model_input = X.values.reshape(1, -1)

    prediction = bool(model.predict(model_input))
    prediction_proba = [100 - y_local[1] for y_local in model.predict_proba(model_input)][0]

    result = {
        'value': X[tag],
        'is_anomaly': prediction,
        'probability': prediction_proba
    }

    return result
