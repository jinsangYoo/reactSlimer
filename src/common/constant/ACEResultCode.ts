enum ACEResultCode {
  // positive
  Success = 200,

  // negative
  AlreadyInitialized = 1000,
  ExecutorNotInitAtPolicy = 1001,
  ExecutorWasShutdownedAtPolicy = 1002,
  ExecutorWasTerminatedAtPolicy = 1003,
  OccurredExceptionAtPolicy = 1004,
  FailAfterRequest = 1005,
  DoNotImplement_to_IACEParameterUtil = 1006,
  DoNotFindMethod = 1007,
  DoNotGetSDKVersion = 1008,
  NeedToCheckService = 1009,
  NeedToCheckAceConfiguration = 1010,
  DoNotImplement_to_IACECommonAPI = 1011,
  DisableSDKOrDoNotImplementAPI = 1012,
  GetQueueManagerFactoryIsNull = 1013,
  DoNotFindKeyword = 1014,
  ParamsIsNull = 1015,
  ProductParamIsNull = 1016,
  FailLogObjectIsNull = 1017,
  NotContainParamsKey = 1018,
  NotConnectToTheInternet = 1019,
  URLParamIsNull = 1020,
  ResponseParamIsNull = 1021,
  FailResponseHeaderToMapType = 1022,
  NeitherDeeplinkAndPush = 1023,
  NotSupportPromise = 1024,
}

export default ACEResultCode