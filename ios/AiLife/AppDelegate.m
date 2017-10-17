/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <SplashScreen.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AiLife"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(videoStarted:) name:AVPlayerItemTimeJumpedNotification object:nil]; //进入全屏
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(videoWillFinished:) name:UIWindowDidBecomeHiddenNotification object:nil]; //结束全屏
  [SplashScreen show];
  
  return YES;
}                                                     

#pragma mark --集成微信分享配置
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}


- (UIInterfaceOrientationMask)application:(UIApplication *)application    supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  if (self.allowRotation) {
    return UIInterfaceOrientationMaskLandscape;
  }else{
    return UIInterfaceOrientationMaskPortrait;
  }
}

- (void)videoStarted:(NSNotification *)notification {
  self.allowRotation = YES;
}

- (void)videoWillFinished:(NSNotification *)notification {
  self.allowRotation = NO;
  
  //设置屏幕的转向为竖屏
  
  [[UIDevice currentDevice] setValue:@(UIDeviceOrientationPortrait) forKey:@"orientation"];
  //刷新
  [UIViewController attemptRotationToDeviceOrientation];
  
  [[UIApplication sharedApplication] setValue:@(NO) forKey:@"statusBarHidden"];
  [[UIApplication sharedApplication] setValue:@(UIInterfaceOrientationPortrait ) forKey:@"statusBarOrientation"];
  
  
  

}


@end
