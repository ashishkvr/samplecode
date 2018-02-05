//
//  AntaviSensePublic.h
//  AntaviSenseSDK
//
//  Created by Ulf Blanke on 21.02.17.
//  Copyright © 2017 antavi GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "Enumerators.h"

#define kSettingsFile @"AntaviSenseSDK.plist"
@interface AntaviSensePublic : NSObject

+ (id)sharedInstance;


// simple onboarding, replace by own onboarding
- (void) onboard:(UINavigationController*) n;
- (void) onboard;

// control AntaviSense
- (void) enable;
- (BOOL) isEnabled;
- (void) enablePush;
- (void) disable;
- (void) refreshConfiguration;
- (void) upload;
- (void) startTracking;
- (void) stopTracking;
- (void) locateNow;
- (NSString*) getId;

// configure AntaviSense
- (BOOL) configure:(NSDictionary*) config;

- (void) setId:(NSString*) identifier;

- (void) addScheduleConfigFrom: (NSString*) start till:(NSString*) stop withInterval: (NSTimeInterval) interval withDuration:(NSTimeInterval) duration;
- (void) setApiUrl:(NSString*)uri;
- (void) setApiKey:(NSString*)uri;

// insert any Dictionary-data to be dumped into the database
- (void) insertCustomData: (NSDictionary*) data withKey:(NSString*) key;

// For push callbacks
- (void) didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken;
- (void) didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

@end
